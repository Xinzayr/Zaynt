import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(): MDXComponents {
  return {
    h2: (props) => <h2 className="mb-4 text-2xl font-bold tracking-tight text-white md:text-3xl" {...props} />,
    h3: (props) => <h3 className="mb-3 text-xl font-semibold text-white" {...props} />,
    p: (props) => <p className="text-base leading-7 text-slate-300 md:text-lg" {...props} />,
    a: (props) => <a className="font-medium text-slate-100 underline decoration-slate-500 underline-offset-4 hover:decoration-white" {...props} />,
    ul: (props) => <ul className="list-disc space-y-2 pl-6 text-slate-300" {...props} />,
    ol: (props) => <ol className="list-decimal space-y-2 pl-6 text-slate-300" {...props} />,
    li: (props) => <li className="pl-1 leading-7" {...props} />,
    strong: (props) => <strong className="font-semibold text-white" {...props} />,
    blockquote: (props) => <blockquote className="border-l-2 border-slate-500 pl-4 italic text-slate-300" {...props} />,
  }
}
