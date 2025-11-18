import React, { useEffect, useState } from 'react'

const App = () => {
const [text, setText] = useState('');
const [markdown, setMarkdown] = useState('');
const [loading, setLoading] = useState(true);
useEffect(()=>{
  setTimeout(()=>{
    setLoading(false)
  }, 1000)
})
useEffect(()=>{
    let markdownHTML = text
    // spaces
    markdownHTML = markdownHTML.replaceAll(/(\s{2,})$/gm, '<br>')
    // bold, italic
    markdownHTML = markdownHTML.replaceAll(/(\*{1,3}|_{1,3})([\p{L}\p{M}\p{N}]+)\1/gu, (_, star, content) => {
        if(star.length === 3){
            return `<em>${content}</em>`
        } else if(star.length === 2){
            return `<strong>${content}</strong>`
        } else if (star.length === 1){
          return `<i>${content}</i>`
        }
        return content
    })
    // headers
    markdownHTML = markdownHTML.replace(/^(#{1,6})\s+(.*)$/gm, (_, hashes, content) => {
        return `<h${hashes.length}>${content}</h${hashes.length}>`
    });
    // underline
    markdownHTML = markdownHTML.replace(/^-{3}/gm, '<hr class="underline">');
    // code-block
    markdownHTML = markdownHTML.replace(/```(.*)```/gms, '<pre class="code-block"><code>$1</code></pre>')
    // lists
    markdownHTML = markdownHTML.replace(/^- (.*)/gm, '<li>$1</li>')  
    setMarkdown(markdownHTML);
    // image
    markdownHTML = markdownHTML.replace(/\!\[(.*)\]\((.*)\)/gms, '<img class="m-image" src="$2" alt="$1"/>')
    setMarkdown(markdownHTML);
},[text])

  if(loading) {
    return <h1>Loading...</h1>
  }
  return (
    <div className="app">
        <textarea onChange={(e) => setText(e.target.value)} value={text} className="textarea"  />
        <div dangerouslySetInnerHTML={{__html: markdown}} className='preview'></div>
    </div>
  )
}

export default App