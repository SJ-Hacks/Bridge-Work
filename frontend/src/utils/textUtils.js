export const splitIntoLines = (text, maxLineLength = 50) => {
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';
  
    words.forEach(word => {
      if ((currentLine + word).length <= maxLineLength) {
        currentLine += word + ' ';
      } else {
        lines.push(currentLine.trim());
        currentLine = word + ' ';
      }
    });
  
    if (currentLine.length > 0) {
      lines.push(currentLine.trim());
    }
  
    return lines;
  };