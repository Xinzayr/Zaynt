import type { Metadata } from 'next'
import Link from 'next/link'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Términos del servicio',
  description: 'Información previa para solicitar, cotizar y coordinar servicios de ZAYNT.',
}

const sections = [
  {
    title: '1. Quién presta los servicios',
    paragraphs: [
      'ZAYNT es un emprendimiento colaborativo en crecimiento. ZAYNT Solutions identifica su línea de servicios informáticos, y sus colaboradores pueden ofrecer otras áreas individualmente o en conjunto. No se afirma en esta página que exista una sociedad constituida, una afiliación institucional, certificaciones o acreditaciones que no se hayan identificado expresamente.',
      'Antes de aceptar una cotización se informará quién coordina y quién ejecutará el trabajo, según corresponda. La cotización identificará al proveedor responsable, sus datos de facturación cuando apliquen y un canal de contacto. Estos términos no sustituyen la información obligatoria del proveedor que exija la normativa.',
    ],
  },
  {
    title: '2. Consulta, evaluación y aceptación',
    paragraphs: [
      'Antes de iniciar cualquier servicio, el cliente debe describir por escrito la necesidad, los síntomas, antecedentes relevantes y el resultado que espera. Se podrá pedir información adicional, fotos o una evaluación inicial. Una consulta o mensaje enviado desde este sitio no constituye por sí solo una orden de trabajo ni autoriza una intervención.',
      'Antes de empezar se enviará una cotización u orden con versión y fecha que detalle, como mínimo, el proveedor responsable, alcance y exclusiones, equipo o lugar, modalidad, precio en USD e impuestos aplicables, materiales, gastos de traslado si los hay, forma y calendario de pago, plazo estimado, criterios de aceptación, revisiones y condiciones de garantía o soporte. El trabajo comienza solo después de la aprobación escrita de esa cotización y del pago inicial acordado.',
      'Si cambia el alcance, el precio, el plazo o los materiales, se documentará el cambio y se solicitará aprobación expresa antes de ejecutarlo. Los mensajes de WhatsApp pueden editarse o borrarse: no se tratarán como un registro inalterable ni se afirmará que un mensaje, captura o aceptación garantiza por sí solo un efecto legal. Se recomienda que ambas partes conserven la cotización y sus versiones y confirmen cualquier cambio mediante una nueva aprobación escrita. La eficacia o valor probatorio de comunicaciones digitales depende de las circunstancias y de la ley aplicable.',
    ],
  },
  {
    title: '3. Precios, pagos y comprobantes',
    paragraphs: [
      'Los precios se cotizan en dólares estadounidenses (USD). Según lo acordado para cada servicio, el pago podrá ser del 100% por adelantado o 50% antes de iniciar y 50% al finalizar. La cotización indicará qué modalidad aplica, qué evento se considera finalización y los gastos o materiales incluidos. No se iniciará hasta recibir el anticipo pactado.',
      'Se podrán acordar transferencias a Banco del Pacífico, PayPal, Stripe, Airtm, Wise u otros métodos confirmados expresamente para la cotización. La disponibilidad, comisiones, conversión y comprobantes se confirmarán antes del pago; nunca se deben enviar contraseñas, códigos de autenticación o claves privadas. Una membresía o aporte en Patreon u otra plataforma no paga ni reserva un servicio salvo que una cotización lo indique de forma expresa.',
    ],
  },
  {
    title: '4. Reprogramación, cancelación y devoluciones',
    paragraphs: [
      'Si el técnico asignado no se presenta a una cita confirmada o ZAYNT no presta el trabajo acordado por una causa atribuible al proveedor, se devolverán íntegramente los importes recibidos por la parte no prestada, sin perjuicio de los derechos obligatorios del cliente.',
      'Si el cliente cancela, no está presente o abandona un trabajo ya iniciado, el tratamiento de anticipos se determinará en la cotización y conforme a la ley: no se cobrarán tareas no realizadas ni conceptos que no hayan sido informados y aceptados. Podrán liquidarse únicamente trabajo efectivamente ejecutado y materiales no reutilizables previamente identificados y autorizados; todo saldo no devengado será devuelto. Si el proveedor no puede continuar, se informará al cliente y se devolverá el saldo correspondiente al servicio no prestado.',
      'Cualquier gasto de desplazamiento, tiempo de traslado, espera o visita debe indicarse por separado y aceptarse antes de la cita; no se presumirá ni se añadirá después. Los reembolsos se tramitarán por el medio y en el plazo acordados, respetando los plazos y derechos previstos por la normativa aplicable.',
    ],
  },
  {
    title: '5. Estado del equipo, datos y acceso',
    paragraphs: [
      'El cliente debe describir con veracidad el estado conocido del equipo o instalación, golpes, líquidos, fallas previas, reparaciones, aperturas, modificaciones y cualquier condición que pueda afectar el trabajo. Cuando sea pertinente y con autorización, ambas partes podrán dejar constancia previa mediante fotos, video o una lista de revisión. Se distinguirán daños o fallas preexistentes de los que pudieran resultar de una intervención; esta constancia no elimina la responsabilidad que corresponda legalmente por una actuación negligente o no autorizada.',
      'El cliente debe respaldar sus archivos antes de entregar o permitir intervenir en un equipo. No se garantiza preservar o recuperar información salvo el alcance específico aceptado. En recuperación de datos se definirá por escrito qué resultado cuenta como éxito, precio y manejo, entrega o eventual conservación de los datos. No se almacenará una copia en la nube sin consentimiento expreso, plazo de conservación definido y medidas de acceso acordadas.',
      'El cliente debe entregar solo los permisos necesarios. Se recomienda no revelar contraseñas personales; cuando un acceso temporal sea indispensable, se acordará un método seguro y el cliente deberá cambiar o revocar las credenciales al concluir.',
    ],
  },
  {
    title: '6. Lugar, modalidad, horarios y seguridad',
    paragraphs: [
      'Los mantenimientos y visitas presenciales se coordinan únicamente dentro de Guayaquil, Ecuador, con cita previa y sujetos a disponibilidad. ZAYNT no publica un local físico para atención al público. No se publican horas fijas: el día y la hora se confirman individualmente.',
      'Fuera de Guayaquil podrán evaluarse consultas, capacitación y soporte remoto cuando el requerimiento lo permita. Las visitas presenciales se rechazarán o suspenderán si el lugar, el acceso o las circunstancias presentan un riesgo razonable para el cliente o el personal. Si es viable, se puede proponer asistencia remota o un espacio público, concurrido y previamente acordado; ninguna persona está obligada a aceptar esa alternativa.',
    ],
  },
  {
    title: '7. Revisión, garantía y límites de la intervención',
    paragraphs: [
      'La cotización describirá cualquier periodo de reporte de fallas, garantía comercial, soporte y mecanismo de corrección aplicable a ese servicio. Un periodo de hasta siete días podrá acordarse para reportar una falla relacionada, pero no constituye una política general de reembolso automático ni reduce derechos obligatorios del consumidor. Cada incidencia se evaluará respecto del alcance, evidencia, causa y ley aplicable.',
      'Si se incluyen revisiones o correcciones para trabajos de software, capacitación o implementación, su número, plazo y alcance se especificarán en la cotización; dependiendo del servicio, podrán ser de hasta diez. Este límite no restringe derechos legales ni impide corregir una prestación no conforme cuando corresponda.',
      'No se asegura recuperar datos, reparar daños previos, lograr compatibilidad con sistemas de terceros, detener amenazas digitales ni obtener resultados que dependan de equipos, redes, proveedores o condiciones fuera del alcance acordado. Se informarán las limitaciones detectadas antes de seguir. No se excluirá responsabilidad cuando la ley no permita hacerlo.',
    ],
  },
  {
    title: '8. Licencias, CCTV y sistemas de terceros',
    paragraphs: [
      'La instalación o activación de Windows, Office u otro software se realizará solo con una licencia válida y autorización suficiente del cliente. No se ofrecen claves, métodos de activación no autorizados ni garantías sobre licencias o servicios de terceros.',
      'Para CCTV, control de acceso, redes o vigilancia electrónica, el cliente debe contar con autorización para intervenir en el sitio y para captar o tratar imágenes, sonido y datos de las personas. El cliente es responsable de definir una finalidad legítima, informar a las personas cuando corresponda y cumplir sus obligaciones de privacidad y seguridad. El alcance, ubicación de dispositivos, acceso a grabaciones y responsables se acuerdan antes de instalar.',
    ],
  },
  {
    title: '9. Cambios, membresías y derechos',
    paragraphs: [
      'Los cursos, guías, soporte prioritario y descuentos para referidos asociados a Patreon u otra membresía dependen de que la opción esté habilitada y de sus condiciones publicadas. No se garantizan contenidos futuros ni descuentos no confirmados; la membresía no sustituye una cotización.',
      'Estos términos son información general para coordinar servicios en Ecuador. No pretenden excluir, limitar o renunciar a derechos irrenunciables del cliente ni reemplazar una revisión jurídica local. En caso de contradicción, prevalecen las normas obligatorias aplicables y los términos específicos aprobados para el servicio, en cuanto sean válidos.',
    ],
  },
]

export default function TerminosPage() {
  return (
    <main className="container-custom py-16 md:py-24">
      <div className="mx-auto max-w-4xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">ZAYNT · Ecuador</p>
        <h1 className="text-3xl font-bold text-white md:text-5xl">Términos de servicio</h1>
        <p className="glass-surface mt-5 rounded-xl p-4 text-sm leading-6 text-slate-200">
          Borrador informativo para coordinar servicios. Antes de usarlo como documento contractual o publicar una versión definitiva, el proveedor responsable debe completar sus datos legales y revisar estas condiciones con asesoría jurídica local. Nada aquí elimina derechos obligatorios del consumidor.
        </p>
        <p className="mt-6 text-sm leading-6 text-slate-400">
          Una solicitud por el sitio o WhatsApp sirve para describir una necesidad y pedir evaluación. El servicio y sus condiciones concretas solo se confirman en la cotización aprobada por ambas partes.
        </p>

        <div className="mt-10 space-y-8">
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
          Para consultar antes de aceptar un servicio, escribe por{' '}
          <a
            className="font-medium text-slate-200 underline underline-offset-4"
            href={`https://wa.me/${siteConfig.whatsappGeneral}?text=${encodeURIComponent('Hola, quisiera consultar los términos de un servicio.')}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp Business
          </a>
          . Consulta también el <Link className="text-slate-200 underline underline-offset-4" href="/privacidad">aviso de privacidad</Link>.
        </p>
      </div>
    </main>
  )
}
