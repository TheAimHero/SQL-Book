import React, {
  useEffect,
  type FC,
  type SetStateAction,
  type Dispatch,
} from 'react';
import Editor, { type EditorProps, useMonaco } from '@monaco-editor/react';
import { useTheme } from 'next-themes';
import { Loader2 } from 'lucide-react';
import { type editor } from 'monaco-editor';
import { useMediaQuery } from 'usehooks-ts';

interface Props {
  data?: string;
  setData: Dispatch<SetStateAction<string | undefined>>;
  setEditor?: Dispatch<SetStateAction<editor.IStandaloneCodeEditor | null>>;
}

const SQLEditor: FC<Props> = ({ setData, data, setEditor }) => {
  const device = useMediaQuery('(min-width: 768px)');
  async function handleEditorChange(value: string | undefined) {
    if (!value) return;
    setData(value);
  }
  const props: EditorProps = {
    className: 'flex-1 w-full',
    options: {
      scrollbar: { vertical: 'hidden', horizontal: 'hidden' },
      overviewRulerBorder: false,
      extraEditorClassName: '',
      lineNumbers: device ? 'on' : 'off',
      lineDecorationsWidth: 0,
      minimap: { enabled: false },
      overviewRulerLanes: 0,
    },
    onMount: (editor) => {
      if (!setEditor) return;
      return setEditor(editor);
    },
    theme: 'vs-dark',
    defaultLanguage: 'sql',
    language: 'sql',
    loading: (
      <div className='my-auto flex h-full w-full items-center justify-between dark:bg-background'>
        <Loader2 className='mx-auto h-10 w-10 animate-spin' />
      </div>
    ),
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    onChange: (value) => handleEditorChange(value),
    defaultValue: data,
    value: data,
  };
  const monaco = useMonaco();
  const { theme } = useTheme();
  useEffect(() => {
    if (!monaco) return;
    monaco.editor.defineTheme('dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [],
      colors: {
        'editor.foreground': '#f6f8fa',
        'editor.background': '#020817',
        'editor.selectionBackground': '#4c2889',
        'editor.inactiveSelectionBackground': '#444d56',
        'editor.lineHighlightBackground': '#444d56',
        'editorCursor.foreground': '#ffffff',
        'editorWhitespace.foreground': '#6a737d',
        'editorIndentGuide.background': '#6a737d',
        'editorIndentGuide.activeBackground': '#f6f8fa',
        'editor.selectionHighlightBorder': '#444d56',
      },
    });
  }, [monaco]);
  useEffect(() => {
    if ((theme === 'dark' || theme === 'system') && monaco) {
      monaco.editor.setTheme('dark');
    } else if (monaco) {
      monaco.editor.setTheme('vs');
    }
  }, [monaco, theme]);
  return <Editor {...props} />;
};

export default SQLEditor;
