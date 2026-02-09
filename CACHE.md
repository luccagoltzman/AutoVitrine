# Controle de cache em produção

Para que as alterações apareçam logo após publicar:

## 1. Bump da versão a cada deploy

1. **config.js** – Atualize `appVersion`:
   ```js
   appVersion: "2.0.1"   // ex: 2.0.0 → 2.0.1
   ```

2. **index.html** – Use o **mesmo valor** em todos os `?v=`:
   - `style.css?v=2.0.1`
   - `config.js?v=2.0.1`
   - `script.js?v=2.0.1`
   - `manifest.json?v=2.0.1`

3. **sw.js** – No topo, atualize `VERSION`:
   ```js
   const VERSION = '2.0.1';
   ```

## 2. O que foi otimizado

- **HTML, CSS, JS, manifest**: sempre **Network First** no Service Worker (rede primeiro; cache só quando offline).
- **Cache busting**: `?v=2.0.0` nos recursos faz o navegador pedir a nova URL e evita cache antigo.
- **Meta tags** no HTML: `Cache-Control`, `Pragma`, `Expires` para desencorajar cache da própria página.
- **Service Worker**: nome do cache com versão; ao subir a versão, caches antigos são apagados na ativação.
- **Atualização do SW**: quando há novo SW, a página pode recarregar sozinha para usar a versão nova.

## 3. Se ainda aparecer versão antiga

- Peça ao usuário **recarregar com Ctrl+F5** (ou Cmd+Shift+R no Mac).
- Ou **limpar cache do site** nas configurações do navegador.
- Em último caso, **desregistrar o Service Worker** (DevTools → Application → Service Workers → Unregister) e recarregar.
