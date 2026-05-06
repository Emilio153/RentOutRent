const http = require('http');

async function seed() {
  console.log("Iniciando seeder...");

  const propiedadesData = [
    {
      titulo: 'Villa de Lujo con Piscina Infinita',
      descripcion: 'Disfruta de unas vacaciones inolvidables en esta espectacular villa. Cuenta con vistas al mar, piscina privada climatizada y todas las comodidades modernas para que te relajes al máximo.',
      direccion: 'Calle del Sol 45, Marbella, Málaga',
      precio_noche: 350.0,
      max_huespedes: 8,
      calendario: '2026-06-01',
      imagenes: [
        'https://images.unsplash.com/photo-1613490908592-15f736c0ce75?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      titulo: 'Ático Moderno en el Centro Histórico',
      descripcion: 'Precioso ático recién reformado en pleno centro. A un paso de los principales museos y restaurantes. Dispone de terraza privada perfecta para desayunar al sol.',
      direccion: 'Plaza Mayor 12, Madrid',
      precio_noche: 120.0,
      max_huespedes: 2,
      calendario: '2026-06-01',
      imagenes: [
        'https://images.unsplash.com/photo-1502672260266-1c1de2d9d0d9?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      titulo: 'Cabaña Rústica en la Montaña',
      descripcion: 'Desconecta de la ciudad en esta acogedora cabaña de madera. Rodeada de naturaleza, con chimenea interior y rutas de senderismo justo en la puerta.',
      direccion: 'Camino del Bosque s/n, Pirineos, Huesca',
      precio_noche: 85.0,
      max_huespedes: 4,
      calendario: '2026-06-01',
      imagenes: [
        'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      titulo: 'Casa Minimalista Frente al Mar',
      descripcion: 'Despierta con el sonido de las olas en esta casa de diseño. Acceso directo a la playa, amplios ventanales y decoración minimalista y relajante.',
      direccion: 'Paseo Marítimo 8, Ibiza, Baleares',
      precio_noche: 450.0,
      max_huespedes: 6,
      calendario: '2026-06-01',
      imagenes: [
        'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      titulo: 'Loft Industrial en Barrio de Moda',
      descripcion: 'Amplio loft de estilo neoyorquino en el barrio más vibrante de la ciudad. Techos altos, paredes de ladrillo visto y cerca de galerías de arte y cafeterías.',
      direccion: 'Calle del Arte 22, Barcelona',
      precio_noche: 140.0,
      max_huespedes: 3,
      calendario: '2026-06-01',
      imagenes: [
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      titulo: 'Chalet Familiar con Gran Jardín',
      descripcion: 'Ideal para familias. Gran jardín con barbacoa, zona de juegos infantiles y piscina compartida en la urbanización. Barrio residencial tranquilo.',
      direccion: 'Avenida las Rosas 50, Valencia',
      precio_noche: 180.0,
      max_huespedes: 6,
      calendario: '2026-06-01',
      imagenes: [
        'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80'
      ]
    }
  ];

  try {
    const emailSeeder = "admin@seed.com";

    // 2. Hacer Login
    const loginRes = await fetch('http://localhost:8092/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: emailSeeder, password: "123" })
    });
    
    if (!loginRes.ok) {
        console.error("Error al loguearse:", await loginRes.text());
        return;
    }
    
    const loginData = await loginRes.json();
    const token = loginData.token;
    console.log("Token obtenido:", token);
    
    let validUserId = null;

    // Brute force to find my User ID
    console.log("Buscando el ID correcto...");
    for (let id = 1; id <= 20; id++) {
        const payload = {
            titulo: "Test Property " + id,
            descripcion: "Test",
            direccion: "Test " + id,
            precio_noche: 100,
            max_huespedes: 1,
            calendario: '2026-06-01',
            propietario: { id: id }
        };
        const res = await fetch('http://localhost:8092/api/propiedades', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(payload)
        });

        if (res.ok) {
            console.log("¡ID encontrado! Es: " + id);
            validUserId = id;
            // Borrar la propiedad de prueba
            const created = await res.json();
            await fetch('http://localhost:8092/api/propiedades/' + created.id, {
                method: 'DELETE',
                headers: { 'Authorization': 'Bearer ' + token }
            });
            break;
        }
    }

    if (!validUserId) {
        console.error("No se pudo encontrar un ID válido.");
        return;
    }

    // 3. Crear propiedades
    for (const p of propiedadesData) {
      const payload = {
        titulo: p.titulo,
        descripcion: p.descripcion,
        direccion: p.direccion,
        precio_noche: p.precio_noche,
        max_huespedes: p.max_huespedes,
        calendario: p.calendario,
        propietario: { id: validUserId }
      };

      console.log("Creando: " + p.titulo);
      
      const res = await fetch('http://localhost:8092/api/propiedades', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(payload)
      });
      
      if(res.ok) {
        const casaCreada = await res.json();
        console.log("Casa creada con ID: " + casaCreada.id);
        
        // 4. Añadir imagenes
        for (const imgUrl of p.imagenes) {
          await fetch('http://localhost:8092/api/imagenes', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
              url: imgUrl,
              propiedad: { id: casaCreada.id }
            })
          });
        }
      } else {
         console.error("Error al crear:", res.status, await res.text());
      }
    }

    console.log("Seeding completado!");

  } catch (error) {
    console.error("Error en seeder:", error);
  }
}

seed();
