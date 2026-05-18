# 🚀 Cómo ejecutar el proyecto localmente

## 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/AgusRe/reboot-studio.git
```

---

## 2️⃣ Entrar a la carpeta del proyecto

```bash
cd reboot-studio
```

---

# 🐳 Ejecutar con Docker (Recomendado)

## 3️⃣ Construir la imagen Docker

```bash
docker build -t reboot-studio-app .
```

---

## 4️⃣ Ejecutar el contenedor

```bash
docker run -p 3000:3000 reboot-studio-app
```

---

## 5️⃣ Abrir en el navegador

```txt
http://localhost:3000
```

---

# 💻 Ejecutar sin Docker (Modo desarrollo)

## 1️⃣ Instalar dependencias

```bash
npm install
```

---

## 2️⃣ Ejecutar servidor de desarrollo

```bash
npm run dev
```

---

## 3️⃣ Abrir en navegador

```txt
http://localhost:5173
```

*(El puerto puede variar dependiendo de la configuración de Vite/Next.js)*

---

# 📦 Comandos útiles

## Ver contenedores activos

```bash
docker ps
```

---

## Detener contenedor

```bash
docker stop <CONTAINER_ID>
```

---

## Ver imágenes Docker

```bash
docker images
```

---

# 🔄 Actualizar proyecto

```bash
git pull
```

---

# 🛠 Requisitos

* Docker Desktop
* Git
* Node.js 18+
* npm

---

# 📬 Soporte

Si encontrás problemas al ejecutar el proyecto:

* Revisar que Docker Desktop esté iniciado
* Verificar que el puerto 3000 no esté ocupado
* Confirmar que Node.js esté instalado correctamente
