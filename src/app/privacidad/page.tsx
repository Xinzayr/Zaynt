import type { Metadata } from 'next'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Aviso de privacidad',
  description: 'Cómo se utilizan y protegen los datos compartidos al consultar servicios de ZAYNT.',
}

const sections = [
  {
    title: '1. Responsable y alcance de este aviso',
    paragraphs: [
      'ZAYNT es el nombre del emprendimiento colaborativo. ZAYNT Solutions identifica su línea de servicios informáticos. El proveedor o colaborador responsable de cada servicio debe quedar identificado en la cotización; este sitio no afirma que exista una sociedad constituida. Antes de publicar una versión definitiva de este aviso se deben completar la identidad legal y los datos de contacto formales del responsable que correspondan.',
      'Este aviso explica el tratamiento de la información que compartes al navegar el sitio, preparar una consulta o contactar al equipo. Los servicios externos, como WhatsApp, correo, plataformas de pago o herramientas de asistencia remota, también se rigen por sus propios avisos y condiciones.',
    ],
  },
  {
    title: '2. Información que puedes compartir',
    paragraphs: [
      'El formulario puede incluir tu nombre, teléfono, correo electrónico opcional, tipo de servicio, modalidad preferida y descripción de la necesidad. Al continuar, el navegador prepara un mensaje y abre WhatsApp; la información no se envía a ZAYNT mediante un formulario con almacenamiento propio en el sitio. Solo se comparte por WhatsApp si decides enviar el mensaje desde esa aplicación.',
      'Durante la evaluación o prestación podrías compartir ubicación del servicio, fotos, datos del equipo, registros técnicos o información necesaria para el trabajo. Evita enviar contraseñas, códigos de autenticación, claves privadas, datos financieros completos o información sensible que no sea necesaria. Para recuperación de datos, se acordará previamente qué información se tratará y cómo.',
      'El proveedor de alojamiento y seguridad del sitio puede procesar datos técnicos de conexión necesarios para entregar y proteger la página, conforme a sus propias condiciones. Actualmente el sitio no ofrece cuentas de usuario ni un canal propio que almacene las consultas del formulario.',
    ],
  },
  {
    title: '3. Para qué se utiliza la información',
    paragraphs: [
      'La información se utiliza para responder consultas, evaluar si una solicitud puede atenderse, preparar y documentar cotizaciones, coordinar citas, ejecutar servicios aceptados, atender solicitudes de soporte o garantía y cumplir obligaciones legales o resolver reclamos cuando corresponda.',
      'No se pretende vender tus datos ni utilizarlos para publicidad de terceros. Si se quisiera usar información identificable para una finalidad nueva, se solicitará la autorización que corresponda antes de hacerlo.',
    ],
  },
  {
    title: '4. Quién podría recibirla',
    paragraphs: [
      'Una consulta enviada por WhatsApp se comparte con WhatsApp y se trata de acuerdo con las políticas de Meta. Según el trabajo que solicites, la información estrictamente necesaria podría compartirse con el colaborador que lo evalúe o ejecute. Si se contrata un servicio, también podría intervenir una plataforma de pago, correo, alojamiento, soporte remoto u otro proveedor necesario, procurando informar su función y no compartir más de lo necesario.',
      'Algunos de esos proveedores pueden tratar datos fuera de Ecuador. Sus prácticas, medidas de seguridad y plazos dependen de cada proveedor; revisa sus avisos antes de enviar información por sus canales.',
    ],
  },
  {
    title: '5. Analítica opcional y consentimiento',
    paragraphs: [
      'Microsoft Clarity es una herramienta opcional de analítica de uso que puede registrar interacciones como clics, desplazamientos y sesiones reproducidas para ayudarnos a entender el funcionamiento del sitio. Si aceptas, el identificador de proyecto de Clarity se carga después de guardar la preferencia y se configura el almacenamiento publicitario como denegado y el analítico como autorizado. Si rechazas, no cargamos su script. El formulario de contacto se excluye de las grabaciones mediante enmascaramiento.',
      'La preferencia se guarda localmente en este navegador para recordar tu decisión. Puedes modificarla en cualquier momento desde el enlace “Preferencias de privacidad” al pie del sitio. Retirar el consentimiento no borra automáticamente registros que Microsoft ya haya recibido; consulta las políticas de Microsoft Clarity y solicita allí lo que corresponda.',
      'Microsoft puede tratar datos técnicos y de interacción desde otros países, incluido Estados Unidos, conforme a sus términos y mecanismos de transferencia. Antes de activar Clarity para producción, el responsable debe revisar el contrato, la configuración de consentimiento, la región/retención disponible, las opciones de exclusión y la evaluación legal que corresponda.',
    ],
  },
  {
    title: '6. Conservación y seguridad',
    paragraphs: [
      'Las consultas y registros del servicio se conservarán solo durante el tiempo necesario para atender la solicitud, administrar el trabajo, cumplir obligaciones legales o contables y gestionar garantías o reclamos. Los plazos concretos pueden depender de la relación y de la normativa aplicable. Los mensajes permanecen también en las cuentas y dispositivos que intervienen, conforme a la configuración de cada plataforma.',
      'Se aplicarán medidas razonables de acceso limitado y manejo seguro. Ninguna transmisión o almacenamiento digital puede garantizar seguridad absoluta. No se conservarán copias de archivos recuperados en la nube sin consentimiento expreso, finalidad, plazo de conservación y forma de eliminación previamente acordados.',
    ],
  },
  {
    title: '7. Tus solicitudes y derechos',
    paragraphs: [
      'Puedes solicitar información sobre el uso de tus datos, acceso, actualización, rectificación, eliminación, oposición, limitación, retiro de autorizaciones u otros derechos reconocidos por la normativa aplicable. La atención de cada solicitud dependerá de la identidad que pueda verificarse, los datos disponibles y las obligaciones de conservación que correspondan.',
      'Para iniciar una solicitud, escribe al canal de WhatsApp publicado en este sitio e indica “Solicitud de privacidad”. No incluyas contraseñas ni documentos sensibles en el primer mensaje. El proveedor responsable deberá confirmar el canal formal y los datos de contacto legal antes de publicar la versión definitiva de este aviso.',
    ],
  },
  {
    title: '8. Cambios y consultas',
    paragraphs: [
      'Este texto es informativo y debe revisarse junto con la identidad del proveedor responsable y las prácticas reales de cada servicio antes de considerarse un aviso definitivo. Si se modifica el tratamiento de datos, se actualizará esta página. Una consulta no equivale a aceptar una cotización ni autoriza por sí sola una intervención.',
    ],
  },
]

export default function PrivacidadPage() {
  return (
    <main className="container-custom py-16 md:py-24">
      <div className="mx-auto max-w-4xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">ZAYNT · Ecuador</p>
        <h1 className="text-3xl font-bold text-white md:text-5xl">Aviso de privacidad</h1>
        <p className="glass-surface mt-5 rounded-xl p-4 text-sm leading-6 text-slate-200">
          Borrador informativo. Antes de presentarlo como aviso definitivo, el proveedor responsable debe completar su identidad legal, contacto formal y verificar que las prácticas descritas coincidan con las operaciones reales. Este texto no sustituye asesoría jurídica local.
        </p>

        <div className="mt-10 space-y-6">
          {sections.map((section) => (
            <section key={section.title} className="glass-surface rounded-2xl p-6 md:p-8">
              <h2 className="text-xl font-semibold text-white">{section.title}</h2>
              <div className="mt-4 space-y-4 text-sm leading-7 text-slate-300">
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </section>
          ))}
        </div>

        <p className="mt-8 text-sm leading-6 text-slate-400">
          Canal de consulta:{' '}
          <a
            className="font-medium text-slate-200 underline underline-offset-4"
            href={`https://wa.me/${siteConfig.whatsappGeneral}?text=${encodeURIComponent('Hola, quisiera realizar una solicitud de privacidad.')}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp Business · {siteConfig.whatsappUsername}
          </a>
        </p>
        <section id="preferencias-de-privacidad" className="glass-surface mt-8 scroll-mt-24 rounded-xl p-5 text-sm leading-6 text-slate-300">
          <h2 className="font-semibold text-white">Preferencias de privacidad</h2>
          <p className="mt-2">
            La elección se solicita una sola vez y queda guardada en este navegador. Para cambiarla o retirar el consentimiento después, usa el enlace “Preferencias de privacidad” al pie del sitio.
          </p>
        </section>
      </div>
    </main>
  )
}
