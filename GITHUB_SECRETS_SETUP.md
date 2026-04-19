# GitHub Secrets Setup

Para que los formularios funcionen correctamente en el sitio desplegado en GitHub Pages, necesitas configurar los siguientes secrets en GitHub:

## Pasos:

1. Ve a tu repositorio en GitHub
2. Click en **Settings** > **Secrets and variables** > **Actions**
3. Click en **New repository secret** y agrega los siguientes:

### Secrets requeridos:

| Nombre | Valor | Descripción |
|--------|-------|-------------|
| `NEXT_PUBLIC_FORMSPREE_ART_CONTACT_ID` | `xjgjrqaw` | Formulario de contacto para arte tradicional |
| `NEXT_PUBLIC_FORMSPREE_WEDDINGS_ID` | `xbdqyvqj` | Formulario para bodas y parejas |
| `NEXT_PUBLIC_FORMSPREE_BABY_FAMILY_ID` | `xeevkbvp` | Formulario para familia y maternidad |
| `NEXT_PUBLIC_FORMSPREE_HEADSHOTS_ID` | `xpqkrgkn` | Formulario para retratos profesionales |
| `NEXT_PUBLIC_FORMSPREE_PETS_ID` | `xvzdrjdj` | Formulario para fotografía de mascotas |

Una vez que agregues estos secrets, el próximo deploy actualizará el sitio con los formularios funcionales.

## Para probar localmente:

Los secretos ya están configurados en `.env.local` para desarrollo local. Ejecuta:

```bash
npm run dev
```

Y los formularios funcionarán correctamente.
