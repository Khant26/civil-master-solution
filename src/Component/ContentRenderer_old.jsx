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
      // If it's not valid JSON, treat as plain text
      return (
        <div className="article-content prose max-w-none text-white">
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
            className="hidden w-full h-32 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg items-center justify-center text-gray-500 text-lgreact-dom_client.js?v=81ff1923:20103 Download the React DevTools for a better development experience: https://react.dev/link/react-devtools
react-dom_client.js?v=81ff1923:4598 Uncaught Error: Objects are not valid as a React child (found: object with keys {type, content}). If you meant to render a collection of children, use an array instead.
    at throwOnInvalidObjectTypeImpl (react-dom_client.js?v=81ff1923:4598:15)
    at throwOnInvalidObjectType (react-dom_client.js?v=81ff1923:4606:13)
    at reconcileChildFibersImpl (react-dom_client.js?v=81ff1923:5217:13)
    at react-dom_client.js?v=81ff1923:5237:35
    at reconcileChildren (react-dom_client.js?v=81ff1923:7182:53)
    at beginWork (react-dom_client.js?v=81ff1923:8701:104)
    at runWithFiberInDEV (react-dom_client.js?v=81ff1923:997:72)
    at performUnitOfWork (react-dom_client.js?v=81ff1923:12561:98)
    at workLoopSync (react-dom_client.js?v=81ff1923:12424:43)
    at renderRootSync (react-dom_client.js?v=81ff1923:12408:13)
throwOnInvalidObjectTypeImpl @ react-dom_client.js?v=81ff1923:4598
throwOnInvalidObjectType @ react-dom_client.js?v=81ff1923:4606
reconcileChildFibersImpl @ react-dom_client.js?v=81ff1923:5217
(anonymous) @ react-dom_client.js?v=81ff1923:5237
reconcileChildren @ react-dom_client.js?v=81ff1923:7182
beginWork @ react-dom_client.js?v=81ff1923:8701
runWithFiberInDEV @ react-dom_client.js?v=81ff1923:997
performUnitOfWork @ react-dom_client.js?v=81ff1923:12561
workLoopSync @ react-dom_client.js?v=81ff1923:12424
renderRootSync @ react-dom_client.js?v=81ff1923:12408
performWorkOnRoot @ react-dom_client.js?v=81ff1923:11827
performWorkOnRootViaSchedulerTask @ react-dom_client.js?v=81ff1923:13505
performWorkUntilDeadline @ react-dom_client.js?v=81ff1923:36
<div>
exports.jsxDEV @ react_jsx-dev-runtime.js?v=81ff1923:247
(anonymous) @ Articles.jsx:98
Articles @ Articles.jsx:91
react_stack_bottom_frame @ react-dom_client.js?v=81ff1923:18509
renderWithHooksAgain @ react-dom_client.js?v=81ff1923:5729
renderWithHooks @ react-dom_client.js?v=81ff1923:5665
updateFunctionComponent @ react-dom_client.js?v=81ff1923:7475
beginWork @ react-dom_client.js?v=81ff1923:8525
runWithFiberInDEV @ react-dom_client.js?v=81ff1923:997
performUnitOfWork @ react-dom_client.js?v=81ff1923:12561
workLoopSync @ react-dom_client.js?v=81ff1923:12424
renderRootSync @ react-dom_client.js?v=81ff1923:12408
performWorkOnRoot @ react-dom_client.js?v=81ff1923:11827
performWorkOnRootViaSchedulerTask @ react-dom_client.js?v=81ff1923:13505
performWorkUntilDeadline @ react-dom_client.js?v=81ff1923:36
<Articles>
exports.jsxDEV @ react_jsx-dev-runtime.js?v=81ff1923:247
Dashboard @ Dashboard.jsx:35
react_stack_bottom_frame @ react-dom_client.js?v=81ff1923:18509
renderWithHooksAgain @ react-dom_client.js?v=81ff1923:5729
renderWithHooks @ react-dom_client.js?v=81ff1923:5665
updateFunctionComponent @ react-dom_client.js?v=81ff1923:7475
beginWork @ react-dom_client.js?v=81ff1923:8525
runWithFiberInDEV @ react-dom_client.js?v=81ff1923:997
performUnitOfWork @ react-dom_client.js?v=81ff1923:12561
workLoopSync @ react-dom_client.js?v=81ff1923:12424
renderRootSync @ react-dom_client.js?v=81ff1923:12408
performWorkOnRoot @ react-dom_client.js?v=81ff1923:11766
performWorkOnRootViaSchedulerTask @ react-dom_client.js?v=81ff1923:13505
performWorkUntilDeadline @ react-dom_client.js?v=81ff1923:36
<Dashboard>
exports.jsxDEV @ react_jsx-dev-runtime.js?v=81ff1923:247
App @ App.jsx:55
react_stack_bottom_frame @ react-dom_client.js?v=81ff1923:18509
renderWithHooksAgain @ react-dom_client.js?v=81ff1923:5729
renderWithHooks @ react-dom_client.js?v=81ff1923:5665
updateFunctionComponent @ react-dom_client.js?v=81ff1923:7475
beginWork @ react-dom_client.js?v=81ff1923:8525
runWithFiberInDEV @ react-dom_client.js?v=81ff1923:997
performUnitOfWork @ react-dom_client.js?v=81ff1923:12561
workLoopSync @ react-dom_client.js?v=81ff1923:12424
renderRootSync @ react-dom_client.js?v=81ff1923:12408
performWorkOnRoot @ react-dom_client.js?v=81ff1923:11766
performWorkOnRootViaSchedulerTask @ react-dom_client.js?v=81ff1923:13505
performWorkUntilDeadline @ react-dom_client.js?v=81ff1923:36
<App>
exports.jsxDEV @ react_jsx-dev-runtime.js?v=81ff1923:247
(anonymous) @ main.jsx:8
Articles.jsx:98 An error occurred in the <div> component.

Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://react.dev/link/error-boundaries to learn more about error boundaries.

defaultOnUncaughtError @ react-dom_client.js?v=81ff1923:6966
logUncaughtError @ react-dom_client.js?v=81ff1923:7020
runWithFiberInDEV @ react-dom_client.js?v=81ff1923:997
lane.callback @ react-dom_client.js?v=81ff1923:7048
callCallback @ react-dom_client.js?v=81ff1923:5491
commitCallbacks @ react-dom_client.js?v=81ff1923:5503
runWithFiberInDEV @ react-dom_client.js?v=81ff1923:999
commitLayoutEffectOnFiber @ react-dom_client.js?v=81ff1923:9976
flushLayoutEffects @ react-dom_client.js?v=81ff1923:12924
commitRoot @ react-dom_client.js?v=81ff1923:12803
commitRootWhenReady @ react-dom_client.js?v=81ff1923:12016
performWorkOnRoot @ react-dom_client.js?v=81ff1923:11950
performWorkOnRootViaSchedulerTask @ react-dom_client.js?v=81ff1923:13505
performWorkUntilDeadline @ react-dom_client.js?v=81ff1923:36
<div>
exports.jsxDEV @ react_jsx-dev-runtime.js?v=81ff1923:247
(anonymous) @ Articles.jsx:98
Articles @ Articles.jsx:91
react_stack_bottom_frame @ react-dom_client.js?v=81ff1923:18509
renderWithHooksAgain @ react-dom_client.js?v=81ff1923:5729
renderWithHooks @ react-dom_client.js?v=81ff1923:5665
updateFunctionComponent @ react-dom_client.js?v=81ff1923:7475
beginWork @ react-dom_client.js?v=81ff1923:8525
runWithFiberInDEV @ react-dom_client.js?v=81ff1923:997
performUnitOfWork @ react-dom_client.js?v=81ff1923:12561
workLoopSync @ react-dom_client.js?v=81ff1923:12424
renderRootSync @ react-dom_client.js?v=81ff1923:12408
performWorkOnRoot @ react-dom_client.js?v=81ff1923:11827
performWorkOnRootViaSchedulerTask @ react-dom_client.js?v=81ff1923:13505
performWorkUntilDeadline @ react-dom_client.js?v=81ff1923:36
<Articles>
exports.jsxDEV @ react_jsx-dev-runtime.js?v=81ff1923:247
Dashboard @ Dashboard.jsx:35
react_stack_bottom_frame @ react-dom_client.js?v=81ff1923:18509
renderWithHooksAgain @ react-dom_client.js?v=81ff1923:5729
renderWithHooks @ react-dom_client.js?v=81ff1923:5665
updateFunctionComponent @ react-dom_client.js?v=81ff1923:7475
beginWork @ react-dom_client.js?v=81ff1923:8525
runWithFiberInDEV @ react-dom_client.js?v=81ff1923:997
performUnitOfWork @ react-dom_client.js?v=81ff1923:12561
workLoopSync @ react-dom_client.js?v=81ff1923:12424
renderRootSync @ react-dom_client.js?v=81ff1923:12408
performWorkOnRoot @ react-dom_client.js?v=81ff1923:11766
performWorkOnRootViaSchedulerTask @ react-dom_client.js?v=81ff1923:13505
performWorkUntilDeadline @ react-dom_client.js?v=81ff1923:36
<Dashboard>
exports.jsxDEV @ react_jsx-dev-runtime.js?v=81ff1923:247
App @ App.jsx:55
react_stack_bottom_frame @ react-dom_client.js?v=81ff1923:18509
renderWithHooksAgain @ react-dom_client.js?v=81ff1923:5729
renderWithHooks @ react-dom_client.js?v=81ff1923:5665
updateFunctionComponent @ react-dom_client.js?v=81ff1923:7475
beginWork @ react-dom_client.js?v=81ff1923:8525
runWithFiberInDEV @ react-dom_client.js?v=81ff1923:997
performUnitOfWork @ react-dom_client.js?v=81ff1923:12561
workLoopSync @ react-dom_client.js?v=81ff1923:12424
renderRootSync @ react-dom_client.js?v=81ff1923:12408
performWorkOnRoot @ react-dom_client.js?v=81ff1923:11766
performWorkOnRootViaSchedulerTask @ react-dom_client.js?v=81ff1923:13505
performWorkUntilDeadline @ react-dom_client.js?v=81ff1923:36
<App>
exports.jsxDEV @ react_jsx-dev-runtime.js?v=81ff1923:247
(anonymous) @ main.jsx:8
"
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