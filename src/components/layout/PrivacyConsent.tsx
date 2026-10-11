'use client'

import Link from 'next/link'
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react'

type ConsentChoice = 'accepted' | 'rejected'

const CONSENT_KEY = 'zaynt-privacy-consent-v1'
const CONSENT_EVENT = 'zaynt:open-privacy-preferences'
const CONSENT_CHANGE_EVENT = 'zaynt:privacy-consent-changed'
type ConsentSnapshot = ConsentChoice | 'unset' | 'storage-error'

function getConsentSnapshot(): ConsentSnapshot {
  try {
    const savedChoice = window.localStorage.getItem(CONSENT_KEY)
    return savedChoice === 'accepted' || savedChoice === 'rejected' ? savedChoice : 'unset'
  } catch {
    return 'storage-error'
  }
}

function subscribeToConsent(onChange: () => void): () => void {
  window.addEventListener(CONSENT_CHANGE_EVENT, onChange)
  window.addEventListener('storage', onChange)
  return () => {
    window.removeEventListener(CONSENT_CHANGE_EVENT, onChange)
    window.removeEventListener('storage', onChange)
  }
}

export function PrivacyConsent() {
  const choice = useSyncExternalStore(subscribeToConsent, getConsentSnapshot, () => 'unset')
  const [isOpen, setIsOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const clarityInitialized = useRef(false)

  const enableClarity = useCallback(async () => {
    const projectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID
    if (!projectId) {
      console.error('No se pudo iniciar Microsoft Clarity: falta NEXT_PUBLIC_CLARITY_PROJECT_ID.')
      setErrorMessage('La analítica no está configurada en este sitio. Tu elección quedó guardada.')
      setIsOpen(true)
      return
    }

    try {
      const { default: Clarity } = await import('@microsoft/clarity')
      Clarity.init(projectId)
      Clarity.consentV2({ ad_Storage: 'denied', analytics_Storage: 'granted' })
      clarityInitialized.current = true
      setErrorMessage('')
      const script = document.getElementById('clarity-script')
      script?.addEventListener('error', () => {
        console.error('No se pudo cargar el script de Microsoft Clarity.')
        script.remove()
        clarityInitialized.current = false
        setErrorMessage('No se pudo conectar con Microsoft Clarity. Revisa tu conexión o la configuración del navegador.')
        setIsOpen(true)
      }, { once: true })
    } catch (error) {
      console.error('No se pudo inicializar Microsoft Clarity tras el consentimiento.', error)
      setErrorMessage('Guardamos tu preferencia, pero la analítica no pudo iniciarse.')
      setIsOpen(true)
    }
  }, [])

  const openPreferences = useCallback(() => {
    setErrorMessage('')
    setIsOpen(true)
  }, [])

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#preferencias-de-privacidad') openPreferences()
    }

    window.addEventListener(CONSENT_EVENT, openPreferences)
    window.addEventListener('hashchange', handleHashChange)
    handleHashChange()
    return () => {
      window.removeEventListener(CONSENT_EVENT, openPreferences)
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [openPreferences])

  useEffect(() => {
    if (choice === 'accepted' && !clarityInitialized.current) void enableClarity()
    if (choice === 'rejected' && clarityInitialized.current) {
      void (async () => {
        try {
          const { default: Clarity } = await import('@microsoft/clarity')
          Clarity.consentV2({ ad_Storage: 'denied', analytics_Storage: 'denied' })
          clarityInitialized.current = false
        } catch (error) {
          console.error('No se pudo actualizar el consentimiento de Microsoft Clarity.', error)
          setErrorMessage('La preferencia se guardó, pero no se pudo actualizar la sesión de analítica activa.')
          setIsOpen(true)
        }
      })()
    }
  }, [choice, enableClarity])

  const saveChoice = (nextChoice: ConsentChoice) => {
    setErrorMessage('')
    try {
      window.localStorage.setItem(CONSENT_KEY, nextChoice)
    } catch (error) {
      console.error('No se pudo guardar la preferencia de privacidad.', error)
      setErrorMessage('No se pudo guardar tu preferencia. Revisa los permisos de almacenamiento del navegador e inténtalo otra vez.')
      return
    }

    window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT))
    setIsOpen(false)
  }

  const shouldShowDialog = isOpen || choice === 'unset' || choice === 'storage-error'

  if (!shouldShowDialog) {
    return null
  }

  return (
    <section
      aria-label="Preferencias de privacidad"
      aria-describedby="privacy-consent-description"
      className="fixed inset-x-4 bottom-4 z-[60] mx-auto max-w-3xl rounded-2xl border border-slate-600 bg-[#111317] p-5 text-white shadow-2xl sm:p-6"
      role="dialog"
      aria-modal="false"
    >
      <h2 className="text-lg font-semibold">Tu privacidad importa</h2>
      <p id="privacy-consent-description" className="mt-2 text-sm leading-6 text-slate-300">
        Usamos almacenamiento esencial para recordar esta elección. Microsoft Clarity es opcional y, si lo aceptas, recopila interacciones para ayudarnos a mejorar el sitio. No iniciaremos Clarity antes de tu consentimiento. Puedes cambiar tu decisión desde “Preferencias de privacidad” al pie de página.
      </p>
      <p className="mt-2 text-sm">
        <Link href="/privacidad" className="text-slate-100 underline underline-offset-4 hover:text-white">
          Leer el aviso de privacidad
        </Link>
      </p>
      {errorMessage && <p className="mt-3 text-sm text-slate-200" role="alert">{errorMessage}</p>}
      <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() => void saveChoice('rejected')}
          className="rounded-lg border border-slate-500 px-4 py-2.5 text-sm font-medium text-slate-100 transition-colors hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
        >
          Rechazar opcionales
        </button>
        <button
          type="button"
          onClick={() => void saveChoice('accepted')}
          className="rounded-lg bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-950 transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
        >
          Aceptar analítica
        </button>
      </div>
    </section>
  )
}
