const { useState, useEffect } = React

export function LongTxt({ text } = 'none text') {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpand = () => {
    setIsExpanded(isExpanded ? false : true)
  }

  const displayText = (typeof text === 'string')
  ? (isExpanded || text.length <= 100
      ? text
      : text.substring(0, 100) + '...')
  : ''

  return (
    <div>
      <p onClick={toggleExpand}>{displayText} <a onClick={toggleExpand}>{isExpanded ? 'hide' : 'Read more...'}</a></p> 
    </div>
  )
}
