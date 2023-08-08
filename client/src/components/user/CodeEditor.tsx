import SyntaxHighlighter from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs';

type codeType = {
    showCode:string,
    codeValue:string[]
}

export default function CodeEditor({showCode,codeValue}:codeType) {

  return (
    <div className='code-editor'>
        <SyntaxHighlighter showLineNumbers language={showCode} style={dracula}>
          {codeValue[0] ? codeValue[0] : 'choose language from above'}
        </SyntaxHighlighter>
    </div>
  )
}
