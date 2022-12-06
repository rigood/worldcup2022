const maxLines = (maxLines) => `
    --max-lines: ${maxLines};
    display: -webkit-box;
    -webkit-line-clamp: var(--max-lines);
    -webkit-box-orient: vertical;
    overflow: hidden;
    `;

export default maxLines;
