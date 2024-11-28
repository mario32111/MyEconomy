import React, { useEffect, useState } from 'react';

const IndexLoader = () => {
    const [htmlContent, setHtmlContent] = useState('');

    useEffect(() => {
        // Asegúrate de que la ruta sea correcta y que el archivo esté en la carpeta public
        fetch('/landing/index.html') // Cambiado a la ruta correcta
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(data => {
                setHtmlContent(data);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }, []);

    return (
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    );
};

export default IndexLoader;