import React from 'react';
import { generateHTML } from '@tiptap/html';
import StarterKit from '@tiptap/starter-kit';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import ListItem from '@tiptap/extension-list-item';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import Image from '@tiptap/extension-image';
import { TextStyle } from '@tiptap/extension-text-style';
import TextAlign from '@tiptap/extension-text-align';

// Simple content renderer for Slate JSON content and TipTap JSON content
const ContentRenderer = ({ content }) => {
  // If content is a JSON string, parse it
  let parsedContent = content;
  if (typeof content === 'string') {
    try {
      parsedContent = JSON.parse(content);
    } catch (e) {
      // If it's not valid JSON, check if it's HTML (from CKEditor)
      if (content.includes('<') && content.includes('>')) {
        return (
          <div className="article-content prose max-w-none text-white">
            <style>
              {`
                .article-content p {
                  font-size: 18px;
                  line-height: 1.6;
                  margin-bottom: 1rem;
                  text-align: justify;
                }
                .article-content h1 {
                  font-size: 24px;
                  font-weight: bold;
                  margin-bottom: 1rem;
                  margin-top: 1.5rem;
                  text-align: justify;
                }
                .article-content h2 {
                  font-size: 22px;
                  font-weight: bold;
                  margin-bottom: 0.75rem;
                  margin-top: 1.25rem;
                  text-align: justify;
                }
                .article-content h3 {
                  font-size: 20px;
                  font-weight: bold;
                  margin-bottom: 0.75rem;
                  margin-top: 1rem;
                  text-align: justify;
                }
                .article-content h4 {
                  font-size: 18px;
                  font-weight: bold;
                  margin-bottom: 0.5rem;
                  margin-top: 0.75rem;
                  text-align: justify;
                }
                .article-content ul, .article-content ol {
                  margin-left: 1.5rem;
                  margin-bottom: 1rem;
                }
                .article-content li {
                  margin-bottom: 0.5rem;
                }
                .article-content img {
                  max-width: 100%;
                  height: auto;
                  margin: 1rem 0;
                }
                .article-content blockquote {
                  border-left: 4px solid #06b6d4;
                  padding-left: 1rem;
                  margin: 1rem 0;
                  font-style: italic;
                  color: #a0aec0;
                }
                .article-content table {
                  width: 100%;
                  border-collapse: collapse;
                  margin: 1rem 0;
                }
                .article-content table td, .article-content table th {
                  border: 1px solid #4a5568;
                  padding: 0.5rem;
                }
                .article-content table th {
                  background-color: #2d3748;
                  font-weight: bold;
                }
                .article-content a {
                  color: #06b6d4;
                  text-decoration: underline;
                }
                .article-content a:hover {
                  color: #22d3ee;
                }
                .article-content code {
                  background-color: #2d3748;
                  padding: 0.2rem 0.4rem;
                  border-radius: 0.25rem;
                  font-family: monospace;
                }
                @media (min-width: 390px) {
                  .article-content p { font-size: 20px; }
                  .article-content h1 { font-size: 26px; }
                  .article-content h2 { font-size: 24px; }
                  .article-content h3 { font-size: 22px; }
                  .article-content h4 { font-size: 20px; }
                }
                @media (min-width: 768px) {
                  .article-content p { font-size: 22px; }
                  .article-content h1 { font-size: 28px; }
                  .article-content h2 { font-size: 26px; }
                  .article-content h3 { font-size: 24px; }
                  .article-content h4 { font-size: 22px; }
                }
                @media (min-width: 1024px) {
                  .article-content p { font-size: 24px; }
                  .article-content h1 { font-size: 30px; }
                  .article-content h2 { font-size: 28px; }
                  .article-content h3 { font-size: 26px; }
                  .article-content h4 { font-size: 24px; }
                }
                @media (min-width: 1280px) {
                  .article-content p { font-size: 26px; }
                  .article-content h1 { font-size: 32px; }
                  .article-content h2 { font-size: 30px; }
                  .article-content h3 { font-size: 28px; }
                  .article-content h4 { font-size: 26px; }
                }
                @media (min-width: 1536px) {
                  .article-content p { font-size: 28px; }
                  .article-content h1 { font-size: 34px; }
                  .article-content h2 { font-size: 32px; }
                  .article-content h3 { font-size: 30px; }
                  .article-content h4 { font-size: 28px; }
                }
                @media (min-width: 1920px) {
                  .article-content p { font-size: 30px; }
                  .article-content h1 { font-size: 36px; }
                  .article-content h2 { font-size: 34px; }
                  .article-content h3 { font-size: 32px; }
                  .article-content h4 { font-size: 30px; }
                }
              `}
            </style>
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        );
      }
      
      // Otherwise treat as plain text
      return (
        <div className="article-content prose max-w-none text-white">
          <style>
            {`
              .article-content p {
                font-size: 18px;
                line-height: 1.6;
                margin-bottom: 1rem;
                text-align: justify;
              }
              .article-content h1 {
                font-size: 24px;
                font-weight: bold;
                margin-bottom: 1rem;
                margin-top: 1.5rem;
                text-align: justify;
              }
              .article-content h2 {
                font-size: 22px;
                font-weight: bold;
                margin-bottom: 0.75rem;
                margin-top: 1.25rem;
                text-align: justify;
              }
              .article-content h3 {
                font-size: 20px;
                font-weight: bold;
                margin-bottom: 0.75rem;
                margin-top: 1rem;
                text-align: justify;
              }
              .article-content img {
                max-width: 100%;
                height: auto;
              }
              @media (min-width: 390px) {
                .article-content p { font-size: 20px; }
                .article-content h1 { font-size: 26px; }
                .article-content h2 { font-size: 24px; }
                .article-content h3 { font-size: 22px; }
              }
              @media (min-width: 768px) {
                .article-content p { font-size: 22px; }
                .article-content h1 { font-size: 28px; }
                .article-content h2 { font-size: 26px; }
                .article-content h3 { font-size: 24px; }
              }
              @media (min-width: 1024px) {
                .article-content p { font-size: 24px; }
                .article-content h1 { font-size: 30px; }
                .article-content h2 { font-size: 28px; }
                .article-content h3 { font-size: 26px; }
              }
              @media (min-width: 1280px) {
                .article-content p { font-size: 26px; }
                .article-content h1 { font-size: 32px; }
                .article-content h2 { font-size: 30px; }
                .article-content h3 { font-size: 28px; }
              }
              @media (min-width: 1536px) {
                .article-content p { font-size: 28px; }
                .article-content h1 { font-size: 34px; }
                .article-content h2 { font-size: 32px; }
                .article-content h3 { font-size: 30px; }
              }
              @media (min-width: 1920px) {
                .article-content p { font-size: 30px; }
                .article-content h1 { font-size: 36px; }
                .article-content h2 { font-size: 34px; }
                .article-content h3 { font-size: 32px; }
              }
            `}
          </style>
          {content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="mb-4 leading-relaxed text-justify">
              {paragraph}
            </p>
          ))}
        </div>
      );
    }
  }

  // If content is a string after parsing attempt, render as plain text
  if (typeof parsedContent === 'string') {
    return (
      <div className="article-content prose max-w-none text-white">
        <style>
          {`
            .article-content p {
              font-size: 18px;
              line-height: 1.6;
              margin-bottom: 1rem;
              text-align: justify;
            }
            .article-content h1 {
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 1rem;
              margin-top: 1.5rem;
              text-align: justify;
            }
            .article-content h2 {
              font-size: 22px;
              font-weight: bold;
              margin-bottom: 0.75rem;
              margin-top: 1.25rem;
              text-align: justify;
            }
            .article-content h3 {
              font-size: 20px;
              font-weight: bold;
              margin-bottom: 0.75rem;
              margin-top: 1rem;
              text-align: justify;
            }
            .article-content img {
              max-width: 100%;
              height: auto;
            }
            @media (min-width: 390px) {
              .article-content p { font-size: 20px; }
              .article-content h1 { font-size: 26px; }
              .article-content h2 { font-size: 24px; }
              .article-content h3 { font-size: 22px; }
            }
            @media (min-width: 768px) {
              .article-content p { font-size: 22px; }
              .article-content h1 { font-size: 28px; }
              .article-content h2 { font-size: 26px; }
              .article-content h3 { font-size: 24px; }
            }
            @media (min-width: 1024px) {
              .article-content p { font-size: 24px; }
              .article-content h1 { font-size: 30px; }
              .article-content h2 { font-size: 28px; }
              .article-content h3 { font-size: 26px; }
            }
            @media (min-width: 1280px) {
              .article-content p { font-size: 26px; }
              .article-content h1 { font-size: 32px; }
              .article-content h2 { font-size: 30px; }
              .article-content h3 { font-size: 28px; }
            }
            @media (min-width: 1536px) {
              .article-content p { font-size: 28px; }
              .article-content h1 { font-size: 34px; }
              .article-content h2 { font-size: 32px; }
              .article-content h3 { font-size: 30px; }
            }
            @media (min-width: 1920px) {
              .article-content p { font-size: 30px; }
              .article-content h1 { font-size: 36px; }
              .article-content h2 { font-size: 34px; }
              .article-content h3 { font-size: 32px; }
            }
          `}
        </style>
        {parsedContent.split('\n\n').map((paragraph, index) => (
          <p key={index} className="mb-4 leading-relaxed text-justify">
            {paragraph}
          </p>
        ))}
      </div>
    );
  }

  // If content is TipTap JSON (has type 'doc'), render as HTML
  if (parsedContent && typeof parsedContent === 'object' && parsedContent.type === 'doc') {
    const html = generateHTML(parsedContent, [
      StarterKit.configure({
        heading: false,
        codeBlock: false,
        orderedList: false,
        paragraph: {
          HTMLAttributes: {
            class: 'text-justify',
          },
        },
      }),
      Bold,
      Italic,
      ListItem,
      BulletList,
      Image.configure({
        inline: true,
        allowBase64: true,
        HTMLAttributes: {
          class: 'w-full h-[350px] object-cover',
        },
      }),
      TextStyle,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        alignments: ['left', 'center', 'right', 'justify'],
      }),
    ]);
    return (
      <div
        className="article-content prose max-w-none text-white"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  // If content is Slate JSON, render it
  if (Array.isArray(parsedContent)) {
    return (
      <div className="article-content prose max-w-none text-white">
        <style>
          {`
            .article-content p {
              font-size: 18px;
              line-height: 1.6;
              margin-bottom: 1rem;
              text-align: justify;
            }
            .article-content h1 {
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 1rem;
              margin-top: 1.5rem;
              text-align: justify;
            }
            .article-content h2 {
              font-size: 22px;
              font-weight: bold;
              margin-bottom: 0.75rem;
              margin-top: 1.25rem;
              text-align: justify;
            }
            .article-content h3 {
              font-size: 20px;
              font-weight: bold;
              margin-bottom: 0.75rem;
              margin-top: 1rem;
              text-align: justify;
            }
            .article-content img {
              max-width: 100%;
              height: auto;
            }
            @media (min-width: 390px) {
              .article-content p { font-size: 20px; }
              .article-content h1 { font-size: 26px; }
              .article-content h2 { font-size: 24px; }
              .article-content h3 { font-size: 22px; }
            }
            @media (min-width: 768px) {
              .article-content p { font-size: 22px; }
              .article-content h1 { font-size: 28px; }
              .article-content h2 { font-size: 26px; }
              .article-content h3 { font-size: 24px; }
            }
            @media (min-width: 1024px) {
              .article-content p { font-size: 24px; }
              .article-content h1 { font-size: 30px; }
              .article-content h2 { font-size: 28px; }
              .article-content h3 { font-size: 26px; }
            }
            @media (min-width: 1280px) {
              .article-content p { font-size: 26px; }
              .article-content h1 { font-size: 32px; }
              .article-content h2 { font-size: 30px; }
              .article-content h3 { font-size: 28px; }
            }
            @media (min-width: 1536px) {
              .article-content p { font-size: 28px; }
              .article-content h1 { font-size: 34px; }
              .article-content h2 { font-size: 32px; }
              .article-content h3 { font-size: 30px; }
            }
            @media (min-width: 1920px) {
              .article-content p { font-size: 30px; }
              .article-content h1 { font-size: 36px; }
              .article-content h2 { font-size: 34px; }
              .article-content h3 { font-size: 32px; }
            }
          `}
        </style>
        {parsedContent.map((node, index) => (
          <NodeRenderer key={index} node={node} />
        ))}
      </div>
    );
  }

  return <div className="text-gray-500">No content available</div>;
};

// Render individual Slate nodes
const NodeRenderer = ({ node }) => {
  if (node.type === 'paragraph') {
    return (
      <p className="mb-4 leading-relaxed text-justify">
        {node.children?.map((child, index) => (
          <LeafRenderer key={index} leaf={child} />
        ))}
      </p>
    );
  }

  if (node.type === 'heading-one') {
    return (
      <h1 className="font-bold mb-4 mt-6 text-justify">
        {node.children?.map((child, index) => (
          <LeafRenderer key={index} leaf={child} />
        ))}
      </h1>
    );
  }

  if (node.type === 'heading-two') {
    return (
      <h2 className="font-bold mb-3 mt-5 text-justify">
        {node.children?.map((child, index) => (
          <LeafRenderer key={index} leaf={child} />
        ))}
      </h2>
    );
  }

  if (node.type === 'heading-three') {
    return (
      <h3 className="font-bold mb-3 mt-4 text-justify">
        {node.children?.map((child, index) => (
          <LeafRenderer key={index} leaf={child} />
        ))}
      </h3>
    );
  }

  if (node.type === 'bulleted-list') {
    return (
      <ul className="list-disc list-inside mb-4 ml-4 text-justify">
        {node.children?.map((child, index) => (
          <NodeRenderer key={index} node={child} />
        ))}
      </ul>
    );
  }

  if (node.type === 'numbered-list') {
    return (
      <ol className="list-decimal list-inside mb-4 ml-4 text-justify">
        {node.children?.map((child, index) => (
          <NodeRenderer key={index} node={child} />
        ))}
      </ol>
    );
  }

  if (node.type === 'list-item') {
    return (
      <li className="mb-1 text-justify">
        {node.children?.map((child, index) => (
          <LeafRenderer key={index} leaf={child} />
        ))}
      </li>
    );
  }

  if (node.type === 'image') {
    return (
      <div className="mb-4">
        <div className="relative inline-block">
          <img
            src={node.url}
            alt="Embedded image"
            className="max-w-full h-auto shadow-sm border border-gray-200"
            style={{ maxHeight: '400px', maxWidth: '100%' }}
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          <div
            className="hidden w-full h-32 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg items-center justify-center text-gray-500 text-lg"
            style={{ display: 'none' }}
          >
            Failed to load image
          </div>
        </div>
      </div>
    );
  }

  // Default paragraph rendering
  return (
    <p className="mb-4 leading-relaxed text-justify text-xl">
      {node.children?.map((child, index) => (
        <LeafRenderer key={index} leaf={child} />
      ))}
    </p>
  );
};

// Render text leaves with formatting
const LeafRenderer = ({ leaf }) => {
  let children = leaf.text || '';

  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span>{children}</span>;
};

export default ContentRenderer;
