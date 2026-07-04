import { useEffect } from 'react'

function ensureMeta(name, attribute = 'name') {
  let element = document.head.querySelector(`meta[${attribute}="${name}"]`)

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, name)
    document.head.append(element)
  }

  return element
}

export function useDocumentMeta({ title, description }) {
  useEffect(() => {
    const previousTitle = document.title
    const descriptionMeta = ensureMeta('description')
    const ogTitle = ensureMeta('og:title', 'property')
    const ogDescription = ensureMeta('og:description', 'property')
    const previousDescription = descriptionMeta.getAttribute('content') ?? ''

    document.title = title
    descriptionMeta.setAttribute('content', description)
    ogTitle.setAttribute('content', title)
    ogDescription.setAttribute('content', description)

    return () => {
      document.title = previousTitle
      descriptionMeta.setAttribute('content', previousDescription)
      ogTitle.setAttribute('content', previousTitle)
      ogDescription.setAttribute('content', previousDescription)
    }
  }, [description, title])
}