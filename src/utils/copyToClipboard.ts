export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    // Check if clipboard API is available and we're in a secure context
    if (navigator.clipboard && (window.isSecureContext || window.location.protocol === 'https:')) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const success = document.execCommand('copy');
      textArea.remove();
      return success;
    }
  } catch (err) {
    console.error('Failed to copy text: ', err);
    // Try fallback method if clipboard API fails
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const success = document.execCommand('copy');
      textArea.remove();
      return success;
    } catch (fallbackErr) {
      console.error('Fallback copy method also failed: ', fallbackErr);
      return false;
    }
  }
};