import { Editor } from "@tinymce/tinymce-react";
import React, { useRef } from "react";

const TINY_MCE_API_KEY = "gwhopq19q5u8lxldbupsxk93ysqkxxujeo860maiqoristn1";
export function TextAreaTinyMCE(props) {
  const { value, onChange } = props;
  const editorRef = useRef(null);
  return (
    <Editor
      apiKey={TINY_MCE_API_KEY}
      onInit={(evt, editor) => (editorRef.current = editor)}
      value={value}
      onEditorChange={onChange}
      init={{
        height: 400,
        menubar: true,
        formats: {
          underline: {
            inline: "span",
            styles: { "text-decoration": "underline" },
            exact: true,
          },
        },
        plugins: [
          "advhr",
          "advimage",
          "advlist",
          "autolink",
          "lists",
          "link",
          "image",
          "charmap",
          "preview",
          "anchor",
          "searchreplace",
          "visualblocks",
          "fullscreen",
          "insertdatetime",
          "media",
          "table",
          "help",
          "wordcount",
          "emotions",
        ],
        toolbar1:
          "undo redo | bold italic underline strikethrough forecolor backcolor| fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist checklist  | forecolor backcolor casechange blocks permanentpen formatpainter removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media pageembed template link anchor codesample | a11ycheck ltr rtl | showcomments addcomment",
        block_formats: "Paragraph=p;Heading 2=h2;Heading 3=h3;Heading 4=h4;",
        content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
      }}
    />
  );
}
