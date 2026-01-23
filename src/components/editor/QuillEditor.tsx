import { useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface QuillEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  readOnly?: boolean;
}

export const QuillEditor = ({ value, onChange, placeholder, readOnly = false }: QuillEditorProps) => {
  const quillRef = useRef<ReactQuill>(null);

  const modules = {
    toolbar: readOnly
      ? false
      : [
          [{ header: [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ color: [] }, { background: [] }],
          ['link'],
          ['clean'],
        ],
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'list',
    'bullet',
    'color',
    'background',
    'link',
  ];

  return (
    <div className="quill-editor-wrapper">
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        readOnly={readOnly}
        className="bg-white dark:bg-obsidian-black text-white"
      />
      <style>{`
        .quill-editor-wrapper .ql-container {
          background: rgba(5, 5, 5, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 0.5rem;
          color: white;
        }
        .quill-editor-wrapper .ql-editor {
          color: white;
          min-height: 200px;
        }
        .quill-editor-wrapper .ql-toolbar {
          background: rgba(5, 5, 5, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 0.5rem 0.5rem 0 0;
        }
        .quill-editor-wrapper .ql-stroke {
          stroke: rgba(255, 255, 255, 0.7);
        }
        .quill-editor-wrapper .ql-fill {
          fill: rgba(255, 255, 255, 0.7);
        }
        .quill-editor-wrapper .ql-picker-label {
          color: rgba(255, 255, 255, 0.7);
        }
      `}</style>
    </div>
  );
};
