export const copyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url)
        .then(() => {
            alert("¡Enlace copiado!");
        })
        .catch((err) => {
            alert("No se pudo copiar el enlace.");
            console.error("Error al copiar el enlace:", err);
        });
};


export const shareOnFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    "facebook-share-dialog",
        "width=626,height=436"
);
};


export const shareOnTwitter = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(document.title);
    window.open(
        `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
    "twitter-share-dialog",
        "width=626,height=436"
);
};


export const shareOnWhatsapp = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(document.title);
    window.open(
        `https://api.whatsapp.com/send?text=${text}%20${url}`,
    "whatsapp-share-dialog"
);
};


const FuncinalidadRedesSociales = () => {
    return null;
};

export default FuncinalidadRedesSociales;