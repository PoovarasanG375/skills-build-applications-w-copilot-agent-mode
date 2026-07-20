export function getApiBaseUrl(component) {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }

  return `http://localhost:8000`;
}

export function buildApiUrl(component) {
  return `${getApiBaseUrl(component)}/api/${component}/`;
}
