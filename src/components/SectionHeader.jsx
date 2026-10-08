import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function SectionHeader({ action, children, copy, eyebrow, title }) {
  return (
    <motion.div
      className="section-header"
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4 }}
    >
      <div className="section-header__text">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h2>{title}</h2>
        {copy ? <p>{copy}</p> : null}
      </div>

      <div className="section-header__aside">
        {action ? (
          <Link className="section-header__link" to={action.to}>
            {action.label} <span aria-hidden="true">→</span>
          </Link>
        ) : null}
        {children}
      </div>
    </motion.div>
  )
}