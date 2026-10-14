(function(){
if (window.SolDocs) return;
const I = (hs, t, d) => ({hs, t, d});
const today = () => window.SolStore.fmt.iso(window.SolStore.TODAY);

/* ============ Documentación por pantalla ============ */
const SCREENS = {
  /* ---------------- MINI PROGRAM ---------------- */
  'mini.toka': { title:'Home de TOKA', where:'Super app TOKA', intro:'El mini program vive dentro de TOKA. El usuario entra desde sus apps con la sesión de TOKA ya iniciada: no hay registro ni login propio.',
    items:[ I('m.toka.app','Acceso a Sol Travel','Ícono del mini program dentro de «Mis apps favoritas». Al tocarlo se abre directamente el Inicio de Sol Travel, sin pantallas intermedias.') ],
    rules:['El usuario entra con su sesión de TOKA. No hay registro ni login propio.','Idioma: español.'] },

  'mini.home': { title:'Inicio', where:'Mini program · Inicio', intro:'Es la pantalla que se abre al entrar al mini program. Muestra la oferta de paquetes directamente. Con «Todos los destinos» y «Recomendados» se ven las secciones Destacados, Más vendidos y un bloque por destino.',
    items:[
      I('m.home.logo','Logo de Sol Travel','Identifica el mini program dentro de TOKA.'),
      I('m.home.dest','Filtro Destino','Abre la lista de destinos: Todos los destinos (por defecto), Europa, Medio Oriente, Estados Unidos, Oriente, Caribe y Latinoamérica. Muestra cuántos paquetes activos tiene cada uno.'),
      I('m.home.sort','Ordenar','Recomendados (por defecto), Precio: menor a mayor o Precio: mayor a menor. Se puede combinar con el destino.'),
      I('m.home.clear','Limpiar filtros','Vuelve a «Todos los destinos» y «Recomendados». Se resalta en naranja cuando hay algún filtro aplicado.'),
      I('m.home.sec.dest','Destacados','Hasta 3 paquetes marcados como Destacado por Sol Travel en el administrador. Se desliza horizontalmente.'),
      I('m.home.sec.best','Más vendidos','Hasta 3 paquetes marcados como Más vendido en el administrador.'),
      I('m.home.sec.block','Bloques por destino','Un bloque por destino en este orden: Europa, Medio Oriente, Estados Unidos, Oriente, Caribe y Latinoamérica. Dentro de cada bloque, el paquete publicado más recientemente aparece primero. Un bloque sin paquetes no se muestra.'),
      I('m.home.card','Tarjeta de paquete','Igual en todas las secciones: imagen de portada (la primera cargada en el administrador), nombre, destino y duración, y «Desde USD … por persona» (precio de adulto). Toda la tarjeta abre el detalle.'),
      I('m.nav','Menú inferior','Siempre visible con cuatro opciones: Inicio, Carrito, Mis viajes y Ayuda.'),
      I('m.nav.cart','Indicador del carrito','Muestra la cantidad de paquetes agregados al carrito.')
    ],
    rules:['Solo se muestran paquetes en estado Activo: dentro de su vigencia y sin desactivar.','Un paquete marcado como Destacado o Más vendido también aparece en el bloque de su destino.','Si una sección o un bloque de destino no tiene paquetes, no se muestra.','Al volver desde el detalle de un paquete, se mantienen la posición, el destino y el orden que el usuario había elegido.'],
    confirm:['Precios en dólares, con formato «USD 1,250.00», e impuestos incluidos. La conversión a pesos mexicanos al momento del pago la realiza la pasarela de TOKA.'] },

  'mini.home-list': { title:'Inicio con filtros', where:'Mini program · Inicio', intro:'Al elegir un destino o un orden por precio, el Inicio muestra una sola lista. No aparecen las secciones Destacados, Más vendidos ni los bloques por destino.',
    items:[
      I('m.home.dest','Destino elegido','El filtro aplicado se marca en azul.'),
      I('m.home.sort','Orden','Con «Precio: menor a mayor» o «Precio: mayor a menor» la lista se ordena por precio de adulto. Si dos paquetes tienen el mismo precio, va primero el más reciente.'),
      I('m.home.clear','Limpiar filtros','Se activa en naranja y vuelve a la vista inicial.'),
      I('m.home.card','Tarjeta de paquete','Misma tarjeta que en el Inicio, en formato de lista.')
    ],
    rules:['Con un destino y «Recomendados»: solo los paquetes de ese destino, del más reciente al más antiguo.','El destino y el orden se pueden combinar. Por ejemplo, Europa con «Precio: menor a mayor» muestra solo los paquetes de Europa, del más económico al más caro.'] },

  'mini.home-empty': { title:'Destino sin paquetes', where:'Mini program · Inicio', intro:'Cuando el destino elegido no tiene paquetes activos.',
    items:[ I('m.home.dest','Destino elegido','En este ejemplo, Latinoamérica: sus paquetes están desactivados en el administrador.'), I('m.home.empty','Mensaje y botón','«Por ahora no tenemos paquetes en este destino» y el botón Ver todos los destinos, que vuelve a «Todos los destinos».') ] },

  'mini.sheet-dest': { title:'Selector de destino', where:'Mini program · Inicio', intro:'Ventana inferior para elegir el destino. Al tocar una opción se aplica de inmediato y se cierra.',
    items:[ I('m.sheet.dest','Lista de destinos','Todos los destinos y los seis destinos, cada uno con su cantidad de paquetes activos. La opción elegida se marca en azul.') ] },
  'mini.sheet-sort': { title:'Selector de orden', where:'Mini program · Inicio', intro:'Ventana inferior para elegir el orden de la lista.',
    items:[ I('m.sheet.sort','Opciones de orden','Recomendados, Precio: menor a mayor y Precio: mayor a menor.') ] },

  'mini.detail': { title:'Detalle del paquete', where:'Mini program · Detalle', intro:'Se abre al tocar una tarjeta. Muestra toda la información del paquete y permite elegir viajeros y agregarlo al carrito.',
    items:[
      I('m.det.carousel','Carrusel de imágenes','Deslizable, de 1 a 5 imágenes. El contador indica la imagen actual.'),
      I('m.det.back','Volver','Regresa a Inicio, en la misma posición y con los mismos filtros.'),
      I('m.det.name','Nombre, destino y duración','Datos tal como se cargaron en el administrador.'),
      I('m.det.prices','Precios','«Adulto (desde 12 años)» y «Niño (2 a 11 años)». El precio de niño solo aparece si el paquete lo tiene.'),
      I('m.det.until','Disponible hasta','Fecha de fin de vigencia del paquete.'),
      I('m.det.desc','Descripción completa','Respeta los saltos de línea. Incluye itinerario, fechas o temporadas, qué incluye, qué no incluye y condiciones.'),
      I('m.det.more','Ver descripción completa','Expande o contrae el texto.'),
      I('m.det.sheet','Selección de viajeros','Fija abajo y siempre visible. Se puede minimizar para leer la descripción.'),
      I('m.det.toggle','Minimizar / Editar','Contrae o expande la selección de viajeros.'),
      I('m.det.adults','Contador Adultos','Botones − y +. Empieza en 1. Mínimo 1, sin máximo.'),
      I('m.det.kids','Contador Niños','Botones − y +. Empieza en 0. Mínimo 0, sin máximo. Solo aparece si el paquete tiene precio de niño.'),
      I('m.det.babies','Nota de bebés','«Si viajas con bebés menores de 2 años, tu asesor te ayudará con su reserva».'),
      I('m.det.total','Total','(adultos × precio adulto) + (niños × precio niño). Se actualiza cada vez que cambia un contador.'),
      I('m.det.add','Agregar al carrito / Actualizar carrito','Agrega el paquete con los viajeros elegidos. Si ya está en el carrito, el botón cambia a Actualizar carrito y reemplaza las cantidades.'),
      I('m.toast','Confirmación','«Agregado al carrito» o «Carrito actualizado», con la opción Ir al carrito.')
    ],
    rules:['Al agregar, el paquete entra al carrito con los adultos y niños elegidos, y aparece el mensaje «Agregado al carrito» con la opción Ir al carrito.','Si el paquete ya está en el carrito, los contadores se muestran con las cantidades que tiene en el carrito y el botón cambia a Actualizar carrito. Al tocarlo, se reemplazan las cantidades y aparece el mensaje «Carrito actualizado».'] },

  'mini.cart': { title:'Carrito', where:'Mini program · Carrito', intro:'Reúne los paquetes que el usuario quiere comprar. Aquí ajusta los viajeros, completa sus datos y paga todo en un solo pago.',
    items:[
      I('m.cart.item','Paquete en el carrito','Imagen de portada, nombre y duración, contadores de Adultos y Niños (Niños solo si el paquete tiene precio de niño) y Subtotal del paquete.'),
      I('m.cart.del','Eliminar','Quita el paquete del carrito.'),
      I('m.cart.na','Paquete no disponible','Si el paquete se vence o se desactiva mientras está en el carrito, aparece marcado como «No disponible» con el mensaje «Este paquete ya no está disponible. Elimínalo para continuar».'),
      I('m.cart.holder','Datos del titular','Se completan una sola vez para toda la compra. Todos son obligatorios.'),
      I('m.cart.prefill','Datos prellenados','Usuario nuevo: los campos que entrega TOKA aparecen prellenados. Usuario recurrente: aparecen los datos de su última compra. Todos se pueden editar.'),
      I('m.cart.f.name','Nombre completo','Texto. No vacío.'),
      I('m.cart.f.doc','Documento de identidad','Texto. No vacío.'),
      I('m.cart.f.pass','Número de pasaporte','Letras y números. No vacío.'),
      I('m.cart.f.email','Correo electrónico','Formato de correo válido.'),
      I('m.cart.f.phone','Celular','Solo números.'),
      I('m.cart.total','Total','Subtotal de cada paquete y Total a pagar, con la nota «Precios con impuestos incluidos». Se recalcula al cambiar un contador o eliminar un paquete.'),
      I('m.cart.pay','Pagar con TOKA','Se habilita solo cuando hay al menos un paquete, ninguno está «No disponible» y todos los datos del titular son válidos.'),
      I('m.nav.cart','Indicador del carrito','Cantidad de paquetes en el carrito.')
    ],
    rules:['Si un campo está vacío o es inválido, el error aparece debajo del campo.','Los datos del titular se guardan por usuario de TOKA, así que en las siguientes compras aparecen todos llenos. Se guardan, o se actualizan, cuando el pago se confirma.','El carrito se guarda por usuario de TOKA, así que se mantiene aunque el usuario cierre el mini program.','Siempre muestra el precio vigente del paquete. Si el precio cambió desde que se agregó, el subtotal se recalcula.','Ejemplo: un paquete con precio adulto USD 10 y precio niño USD 5, con 2 adultos y 1 niño, da un subtotal de USD 25.'],
    confirm:['La conversión a pesos mexicanos al momento del pago la realiza la pasarela de TOKA.'] },

  'mini.cart-empty': { title:'Carrito vacío', where:'Mini program · Carrito', intro:'Estado del carrito sin paquetes.',
    items:[ I('m.cart.empty','Mensaje y botón','«Tu carrito está vacío» y el botón Explorar paquetes, que lleva a Inicio.') ] },

  'mini.sheet-pay': { title:'Pasarela de pago TOKA', where:'TOKA · Pasarela (simulación)', intro:'Al tocar Pagar con TOKA se abre la pasarela nativa de TOKA. Esa pantalla pertenece a TOKA y no forma parte del diseño del mini program: aquí se simula solo para poder probar los dos resultados.',
    items:[ I('m.sheet.pay','Resumen del cobro','Valor total en USD y cantidad de paquetes. TOKA convierte el valor a pesos mexicanos.'), I('m.pay.approve','Aprobar pago (simulación)','Simula un pago confirmado por TOKA.'), I('m.pay.reject','Rechazar pago (simulación)','Simula un pago rechazado.') ],
    rules:['Una compra genera un solo pago y un solo número de orden, con todos los paquetes del carrito.'], confirm:['Conversión de USD a pesos mexicanos a cargo de la pasarela de TOKA.'] },

  'mini.result-ok': { title:'Pago exitoso', where:'Mini program · Resultado', intro:'Pantalla que confirma la compra. En este momento la orden ya aparece en el administrador, en Órdenes.',
    items:[ I('m.ok.title','Ícono y mensaje de éxito','«¡Tu compra fue exitosa!»'), I('m.ok.order','Número de orden','Un solo número para toda la compra.'), I('m.ok.summary','Resumen','Cada paquete con sus adultos y niños, y el total pagado.'), I('m.ok.trips','Ver mis viajes','Lleva a Mis viajes, donde ya aparece la compra.'), I('m.ok.home','Volver al inicio','Regresa a Inicio.') ],
    rules:['El carrito se vacía.','Los datos del titular quedan guardados para la próxima compra.'] },

  'mini.result-fail': { title:'Pago rechazado', where:'Mini program · Resultado', intro:'Pantalla cuando TOKA no aprueba el pago.',
    items:[ I('m.fail.title','Ícono y mensaje de error','«No pudimos procesar tu pago. Puedes intentarlo de nuevo».'), I('m.fail.retry','Reintentar pago','Vuelve al carrito con los paquetes y los datos intactos.'), I('m.fail.home','Volver al inicio','Regresa a Inicio.') ],
    rules:['El carrito no se vacía.'] },

  'mini.trips': { title:'Mis viajes', where:'Mini program · Mis viajes', intro:'Muestra los paquetes que el usuario ha comprado, de la compra más reciente a la más antigua.',
    items:[ I('m.trips.card','Tarjeta de viaje','Imagen de portada y nombre, número de orden y fecha de compra, viajeros (ej.: «2 adultos, 1 niño»), valor pagado por ese paquete y estado «Pagado». Si una compra incluyó varios paquetes, cada uno tiene su tarjeta con el mismo número de orden.'), I('m.trips.change','Aviso de cambios','«Este paquete ha tenido cambios, revísalo con tu asesor». Aparece si el paquete se editó en el administrador después de la compra.') ],
    rules:['Solo paquetes de compras con pago confirmado.','La compra se sigue mostrando aunque el paquete se venza o se desactive.','El valor pagado no cambia aunque después cambie el precio del paquete.'] },

  'mini.trips-empty': { title:'Mis viajes sin compras', where:'Mini program · Mis viajes', intro:'Estado para un usuario que todavía no ha comprado.',
    items:[ I('m.trips.empty','Mensaje y botón','«Aún no tienes viajes» y el botón Explorar paquetes, que lleva a Inicio.') ] },

  'mini.trip': { title:'Detalle del viaje', where:'Mini program · Mis viajes', intro:'Se abre al tocar una tarjeta de Mis viajes.',
    items:[ I('m.trip.back','Volver','Regresa a Mis viajes.'), I('m.trip.change','Aviso de cambios','Si aplica: el paquete se editó después de la compra.'), I('m.trip.purchase','Datos de la compra','Número de orden, fecha, viajeros, valor pagado y estado.'), I('m.trip.holder','Datos del titular','Los datos registrados en la compra.'), I('m.trip.advisor','Mensaje fijo','«Un asesor de Sol Travel se comunicará contigo para confirmar las fechas de tu viaje y los datos de los viajeros».'), I('m.trip.info','Información actual del paquete','Imágenes, nombre, destino, duración y descripción vigentes.') ],
    rules:['El aviso de cambios aparece ante cualquier edición del paquete posterior a la compra.'] },

  'mini.help': { title:'Ayuda', where:'Mini program · Ayuda', intro:'Al tocar Ayuda en el menú se abre una ventana emergente sobre la pantalla en la que está el usuario.',
    items:[ I('m.help','Ventana «¿Necesitas ayuda?»','Título y texto «Comunícate con Sol Travel:».'), I('m.help.mail','Correo','Texto que el usuario puede seleccionar y copiar. El botón de la derecha lo copia.'), I('m.help.phone','Teléfono','Texto que el usuario puede seleccionar y copiar.'), I('m.help.ok','Aceptar','Cierra la ventana y deja al usuario donde estaba.') ],
    rules:['Son datos fijos que entrega Sol Travel. No se editan desde el administrador.'] },

  /* ---------------- ADMINISTRADOR ---------------- */
  'admin.login': { title:'Ingreso', where:'Administrador · Acceso', intro:'Pantalla de ingreso para el equipo de Sol Travel. Para probar: laura.mendez@soltravel.com / SolTravel2026.',
    items:[ I('a.login.err','Error de ingreso','«Correo o contraseña incorrectos». No se indica cuál de los dos falló.'), I('a.login.info','Confirmación','Aparece al volver de crear una nueva contraseña: «Contraseña actualizada».'), I('a.login.email','Correo electrónico','Obligatorio, con formato de correo válido.'), I('a.login.pass','Contraseña','Obligatoria, oculta. El ícono del ojo la muestra.'), I('a.login.forgot','¿Olvidaste tu contraseña?','Lleva a la recuperación.'), I('a.login.submit','Ingresar','Se activa con un correo válido y una contraseña. Lleva al listado de paquetes.') ] },
  'admin.forgot': { title:'Recuperar contraseña', where:'Administrador · Acceso', intro:'El usuario escribe su correo y toca Enviar enlace.',
    items:[ I('a.forgot.form','Correo electrónico','Correo con el que ingresa al administrador.'), I('a.forgot.send','Enviar enlace','Envía un correo con un enlace de un solo uso, con vencimiento.'), I('a.forgot.msg','Mensaje','«Si el correo está registrado, recibirás un enlace para restablecer tu contraseña». Es el mismo exista o no el correo.'), I('a.forgot.back','Volver al ingreso','Regresa a la pantalla de ingreso.') ] },
  'admin.reset': { title:'Crear nueva contraseña', where:'Administrador · Acceso', intro:'Pantalla que abre el enlace del correo (de recuperación o de bienvenida a un usuario nuevo).',
    items:[ I('a.reset.form','Nueva contraseña','Campos Nueva contraseña y Confirmar contraseña.'), I('a.reset.confirm','Validación','Las dos contraseñas deben coincidir. Si no, aparece «Las contraseñas no coinciden».'), I('a.reset.save','Guardar contraseña','Se habilita cuando ambas coinciden.') ] },
  'admin.resetok': { title:'Contraseña creada', where:'Administrador · Acceso', intro:'Confirmación después de guardar la nueva contraseña.',
    items:[ I('a.reset.ok','Volver al login','Vuelve al ingreso con el mensaje «Contraseña actualizada». La nueva contraseña ya funciona.') ] },

  'admin.packages': { title:'Paquetes: listado', where:'Administrador · Paquetes', intro:'Pantalla principal del administrador. Todo lo que se publica aquí se refleja en el mini program sin intervención de un desarrollador.',
    items:[
      I('a.side.user','Usuario que ingresó','Nombre y correo del administrador con sesión.'),
      I('a.side.menu','Menú lateral','Siempre visible: Paquetes, Órdenes y Usuarios.'),
      I('a.side.logout','Cerrar sesión','Sale del administrador.'),
      I('a.pk.create','Crear paquete','Abre el formulario de creación.'),
      I('a.pk.tabs','Pestañas Activos e Inactivos','Activos: visibles en TOKA. Inactivos: Programados, Vencidos y Desactivados. Muestran la cantidad de cada uno.'),
      I('a.pk.filters','Buscador y filtro de destino','Buscador por nombre del paquete y filtro por destino.'),
      I('a.pk.estado','Filtro de estado','Solo en Inactivos: Programado, Vencido o Desactivado.'),
      I('a.pk.clear','Limpiar filtros','Quita búsqueda y filtros.'),
      I('a.pk.table','Tabla de paquetes','Portada, Nombre, Destino, Precio adulto, Precio niño («—» si no tiene), Vigencia, Estado y Marca. Del más reciente al más antiguo.'),
      I('a.pk.view','Ver','Abre la vista del paquete.'),
      I('a.pk.dup','Duplicar','Abre el formulario de creación con los datos del paquete.'),
      I('a.pk.pager','Paginación','20 paquetes por página: «Mostrando 1–20 de 45», Anterior, Siguiente y números de página.')
    ],
    rules:['Al cambiar de pestaña o buscar, se vuelve a la página 1.','Al volver desde la vista de un paquete, se mantiene la página en la que estaba el usuario.','Los cambios de estado por fecha son automáticos.','Los paquetes no se eliminan; solo se desactivan.'], confirm:['Precios en dólares (USD).'] },

  'admin.form': { title:'Crear / duplicar / editar paquete', where:'Administrador · Paquetes', intro:'Formulario con los mismos campos y validaciones para crear, duplicar y editar. Los errores aparecen debajo de cada campo y los textos muestran un contador de caracteres.',
    items:[
      I('a.f.name','Nombre','Obligatorio. Máximo 80 caracteres. Al duplicar se agrega « (copia)»; si supera 80, se recorta el nombre original.'),
      I('a.f.dest','Destino','Obligatorio: Caribe, Estados Unidos, Europa, Medio Oriente, Oriente o Latinoamérica. Cambiarlo mueve el paquete al bloque y al filtro del nuevo destino en el mini program.'),
      I('a.f.dur','Duración','Obligatoria. Máximo 40 caracteres. Ejemplo: «16 días / 15 noches».'),
      I('a.f.imgs','Imágenes','De 1 a 5, JPG o PNG, máximo 4 MB cada una. Se reordenan arrastrándolas y se eliminan con la X. La primera es la portada. Puedes cargar imágenes reales desde tu equipo.'),
      I('a.f.desc','Descripción','Obligatoria. Máximo 3.000 caracteres, con saltos de línea.'),
      I('a.f.prices','Precio adulto','Obligatorio. USD, mayor que 0, hasta 2 decimales.'),
      I('a.f.child','Precio niño','Opcional. Si se deja vacío, el paquete no muestra contador de niños en TOKA.'),
      I('a.f.vig','Vigencia','Inicio: hoy o una fecha futura. Fin: igual o posterior al inicio.'),
      I('a.f.willstatus','Estado al publicar','Activo si la vigencia ya empezó, Programado si empieza en el futuro.'),
      I('a.f.marks','Marcas','Destacado o Más vendido, solo una. Máximo 3 paquetes activos por marca.'),
      I('a.f.cancel','Cancelar','Sale sin guardar. Si hay información ingresada, pregunta antes de salir.'),
      I('a.f.publish','Publicar / Publicar cambios','Se habilita solo cuando todos los campos obligatorios están completos y son válidos.')
    ],
    rules:['Un paquete puede tener solo una marca. Al marcar una, la otra se deshabilita.','El límite de 3 por marca cuenta solo los paquetes Activos. Si ya hay 3, la casilla se deshabilita con el mensaje «Ya tienes 3 paquetes activos en [Destacados / Más vendidos]. Desmarca uno para agregar este».','Un paquete Programado puede marcarse aunque ya haya 3 Activos con esa marca. Cuando su vigencia empiece, solo se mostrarán en TOKA los 3 más recientes.','Duplicar copia todos los datos, incluidas las imágenes. Las marcas no se copian. Nada se crea hasta tocar Publicar.','Al publicar aparece «Paquete publicado» y se vuelve al listado.'] },

  'admin.view': { title:'Vista del paquete', where:'Administrador · Paquetes', intro:'Se abre al tocar Ver en el listado. Todos los campos en solo lectura.',
    items:[ I('a.v.edit','Editar','Habilita la edición de todos los campos.'), I('a.v.toggle','Desactivar / Activar','Desactivar pide confirmación. Activar devuelve el paquete al estado que le corresponde por su vigencia.'), I('a.v.back','Volver','Regresa al listado, en la misma página.'), I('a.v.imgs','Imágenes','La primera es la portada.'), I('a.v.info','Información del paquete','Nombre, destino, duración, precios, vigencia y marca.'), I('a.v.desc','Descripción','Con sus saltos de línea.'), I('a.v.status','Estado actual','Activo, Programado, Vencido o Desactivado.'), I('a.v.orders','Órdenes pagadas','Cantidad de órdenes pagadas que incluyen este paquete.') ],
    rules:['Cambiar el precio no afecta las órdenes ya pagadas.','Cualquier cambio publicado en un paquete con órdenes activa el aviso de cambios en Mis viajes de esos compradores.','Un paquete Vencido se puede volver a mostrar editando su fecha de fin de vigencia.'] },

  'admin.orders': { title:'Órdenes', where:'Administrador · Órdenes', intro:'Historial de compras con pago confirmado por TOKA. Es de solo lectura, de la más reciente a la más antigua.',
    items:[ I('a.o.filters','Filtros','Paquete (por nombre) e ID TOKA.'), I('a.o.dates','Rango de fechas','Desde y hasta.'), I('a.o.table','Tabla','Número de orden, fecha y hora de confirmación, titular, paquetes, viajeros, total en USD e ID de la transacción en TOKA. Al tocar una fila se abre el detalle.'), I('a.o.view','Ver','Abre el detalle de la orden.'), I('a.o.export','Exportar','Excel o CSV. Descarga todas las órdenes que cumplen los filtros, no solo las de la página actual. En el prototipo descarga un archivo real.'), I('a.o.exportmenu','Formatos','Excel (.xls) o CSV (.csv).'), I('a.o.pager','Paginación','20 órdenes por página.') ],
    rules:['Al aplicar o limpiar filtros, se vuelve a la página 1. Al volver desde el detalle se mantiene la página.','Exportación: una fila por paquete comprado. Columnas: número de orden, fecha y hora, ID TOKA, nombre, documento, pasaporte, correo, celular, paquete, destino, adultos, precio adulto, niños, precio niño, subtotal del paquete y total de la orden.'] },

  'admin.order': { title:'Detalle de la orden', where:'Administrador · Órdenes', intro:'Información completa de una compra.',
    items:[ I('a.od.hero','Datos de la orden','Número de orden, fecha y hora, e ID de la transacción en TOKA.'), I('a.od.back','Volver','Regresa al listado de órdenes.'), I('a.od.items','Paquetes','Por cada paquete: nombre, destino, adultos con su precio unitario, niños con su precio unitario y subtotal. Los precios son los del momento de la compra.'), I('a.od.holder','Datos del titular','Nombre completo, documento, pasaporte, correo y celular.') ] },

  'admin.users': { title:'Usuarios', where:'Administrador · Usuarios', intro:'Gestión de los administradores de Sol Travel. Mínimo 1 y máximo 3, todos con los mismos permisos.',
    items:[ I('a.u.count','Cupo de usuarios','Cuántos de los 3 cupos están en uso.'), I('a.u.create','Crear usuario','Se deshabilita cuando ya hay 3 usuarios, con el mensaje «Ya tienes el máximo de 3 usuarios administradores».'), I('a.u.table','Listado','Nombre, correo, fecha de creación y acciones.'), I('a.u.edit','Editar','Cambia nombre y correo. La contraseña no se edita aquí.'), I('a.u.del','Eliminar','Pide confirmación.'), I('a.u.delself','Eliminar (propio usuario)','Deshabilitado: un usuario no puede eliminarse a sí mismo.') ],
    rules:['Si solo queda 1 usuario, Eliminar se deshabilita con el mensaje «Debe existir al menos un usuario administrador».','La contraseña nunca la escribe otro administrador; cada usuario define la suya.','El primer usuario lo crea Wigilabs al salir a producción, con el correo que entregue Sol Travel.'] },

  'admin.dlg-leave': { title:'¿Salir sin publicar?', where:'Administrador · Diálogo', intro:'Aparece al cancelar un formulario con información ingresada.', items:[ I('a.dlg.cancel','Seguir editando','Cierra el diálogo sin perder nada.'), I('a.dlg.ok','Salir','Sale sin guardar.') ] },
  'admin.dlg-confirmEdit': { title:'Paquete con compras', where:'Administrador · Diálogo', intro:'Antes de publicar cambios en un paquete que tiene órdenes pagadas.', items:[ I('a.dlg.confirmEdit','Mensaje','«Este paquete tiene [X] compras. Los compradores verán en Mis viajes el aviso…».'), I('a.dlg.ok','Publicar cambios','Publica y activa el aviso de cambios para esos compradores.'), I('a.dlg.cancel','Cancelar','Vuelve al formulario.') ] },
  'admin.dlg-deactivate': { title:'Desactivar paquete', where:'Administrador · Diálogo', intro:'Confirmación antes de desactivar.', items:[ I('a.dlg.deactivate','Mensaje','El paquete deja de verse en el mini program y se marca como no disponible en los carritos donde esté. Las compras ya realizadas no cambian.'), I('a.dlg.ok','Desactivar','Confirma.'), I('a.dlg.cancel','Cancelar','No hace cambios.') ] },
  'admin.dlg-newuser': { title:'Crear usuario', where:'Administrador · Diálogo', intro:'Alta de un nuevo administrador.', items:[ I('a.dlg.newuser','Campos','Nombre completo (obligatorio, máximo 80 caracteres) y correo (formato válido, no puede estar repetido).'), I('a.dlg.ok','Crear','Se habilita con los campos válidos. El nuevo usuario recibe un correo con un enlace para definir su contraseña.'), I('a.dlg.cancel','Cancelar','Vuelve al listado sin crear nada.') ] },
  'admin.dlg-edituser': { title:'Editar usuario', where:'Administrador · Diálogo', intro:'Cambio de nombre y correo con las mismas validaciones.', items:[ I('a.dlg.edituser','Campos','Nombre y correo.'), I('a.dlg.ok','Guardar cambios','Se habilita con los campos válidos y algún cambio.'), I('a.dlg.cancel','Cancelar','Vuelve sin guardar.') ] },
  'admin.dlg-deluser': { title:'Eliminar usuario', where:'Administrador · Diálogo', intro:'Confirmación antes de eliminar.', items:[ I('a.dlg.deluser','Mensaje','«¿Eliminar a [nombre]? Ya no podrá ingresar al administrador».'), I('a.dlg.ok','Eliminar','Confirma.'), I('a.dlg.cancel','Cancelar','No hace cambios.') ] }
};

/* Elementos comunes que se suman a cualquier pantalla si están visibles */
const EXTRA = { mini:[ I('m.toast','Mensaje de confirmación','Mensaje temporal que confirma la acción.') ], admin:[ I('a.toast','Mensaje de confirmación','Mensaje temporal que confirma la acción.'), I('a.toast.action','Ver correo (simulación)','Abre el correo de bienvenida que recibe el nuevo usuario para definir su contraseña.') ] };

function screenKey(S, app){
  if (!S) return null; const st = S.state;
  if (app === 'mini'){
    const m = st.mini;
    if (m.sheet === 'help') return 'mini.help';
    if (m.sheet === 'dest') return 'mini.sheet-dest';
    if (m.sheet === 'sort') return 'mini.sheet-sort';
    if (m.sheet === 'pay') return 'mini.sheet-pay';
    if (m.screen === 'home'){ const h = S.home(); return h.empty ? 'mini.home-empty' : h.mode === 'list' ? 'mini.home-list' : 'mini.home'; }
    if (m.screen === 'cart') return S.cart().length ? 'mini.cart' : 'mini.cart-empty';
    if (m.screen === 'trips') return S.trips().length ? 'mini.trips' : 'mini.trips-empty';
    if (m.screen === 'result') return m.result && m.result.ok ? 'mini.result-ok' : 'mini.result-fail';
    return 'mini.' + m.screen;
  }
  const a = st.admin;
  if (a.dialog) return 'admin.dlg-' + a.dialog;
  if (a.udlg) return 'admin.dlg-' + ({create:'newuser', edit:'edituser', delete:'deluser'})[a.udlg.kind];
  return 'admin.' + a.screen;
}

/* Lista de pantallas para el modo libre */
const INDEX = {
  mini: [
    ['TOKA', 'mini.toka', S => S.setMini({screen:'toka', sheet:null})],
    ['Inicio', 'mini.home', S => S.setMini({screen:'home', sheet:null, dest:'all', sort:'rec'})],
    ['Inicio con filtros', 'mini.home-list', S => S.setMini({screen:'home', sheet:null, dest:'Europa', sort:'asc'})],
    ['Destino sin paquetes', 'mini.home-empty', S => S.setMini({screen:'home', sheet:null, dest:'Latinoamérica', sort:'rec'})],
    ['Detalle del paquete', 'mini.detail', S => S.openDetail('turquia')],
    ['Carrito', 'mini.cart', S => { if (!S.cart().length) S.cart().push({pid:'turquia', a:2, k:1}, {pid:'japon', a:1, k:0}); S.setMini({screen:'cart', sheet:null}); }],
    ['Mis viajes', 'mini.trips', S => S.setMini({screen:'trips', sheet:null})],
    ['Ayuda', 'mini.help', S => S.setMini({sheet:'help'})]
  ],
  admin: [
    ['Ingreso', 'admin.login', S => S.setAdmin({screen:'login', dialog:null, udlg:null})],
    ['Recuperar contraseña', 'admin.forgot', S => S.setAdmin({screen:'forgot', dialog:null, udlg:null, forgot:{email:'laura.mendez@soltravel.com', sent:false}})],
    ['Paquetes', 'admin.packages', S => S.setAdmin({screen:'packages', me:S.state.admin.me||'laura', dialog:null, udlg:null, form:null})],
    ['Crear paquete', 'admin.form', S => { S.setAdmin({me:S.state.admin.me||'laura'}); S.openForm('create'); }],
    ['Vista del paquete', 'admin.view', S => S.setAdmin({screen:'view', view:'turquia', me:S.state.admin.me||'laura', dialog:null, udlg:null, form:null})],
    ['Órdenes', 'admin.orders', S => S.setAdmin({screen:'orders', me:S.state.admin.me||'laura', dialog:null, udlg:null, form:null})],
    ['Detalle de orden', 'admin.order', S => S.setAdmin({screen:'order', order:4817, me:S.state.admin.me||'laura', dialog:null, udlg:null, form:null})],
    ['Usuarios', 'admin.users', S => S.setAdmin({screen:'users', me:S.state.admin.me||'laura', dialog:null, udlg:null, form:null})]
  ]
};

/* Simulaciones disponibles en modo libre */
const SIMS = {
  mini: [
    {label:'Ver como usuario nuevo (Mario, sin compras)', run:S=>{ S.switchUser('mario'); }},
    {label:'Ver como usuario recurrente (Andrea, con compras)', run:S=>{ S.switchUser('andrea'); }},
    {label:'Desactivar desde el admin un paquete del carrito', run:S=>{ const l=S.cart()[0]; if(!l){ S.cart().push({pid:'europa',a:2,k:0}); } const p=S.pkg((S.cart()[0]).pid); p.off=true; S.setMini({screen:'cart', sheet:null}); }},
    {label:'Subir USD 100 el precio adulto de los paquetes del carrito', run:S=>{ S.cart().forEach(l=>{ S.pkg(l.pid).adult+=100; }); S.setMini({screen:'cart', sheet:null}); }}
  ],
  admin: [
    {label:'Abrir el enlace del correo de recuperación', run:S=>S.setAdmin({screen:'reset', reset:{p1:'', p2:'', who:'Laura', uid:'laura', touched:false}})},
    {label:'Ingresar directamente como Laura', run:S=>S.setAdmin({screen:'packages', me:'laura', dialog:null, udlg:null})}
  ]
};

/* ============ Recorrido guiado ============ */
const base = (S, opts) => { S.reset(); const st = S.state; opts = opts||{}; if (opts.user) st.mini.user = opts.user; if (opts.admin){ st.admin.me='laura'; } return st; };
const cartTD = S => { S.cart().push({pid:'turquia', a:2, k:1}, {pid:'japon', a:1, k:0}); };
const TOUR = [
  /* ---- Mini program ---- */
  {ch:'Mini program', tab:'mini', title:'Entrada desde TOKA', text:'El usuario abre TOKA y toca Sol Travel en sus apps. Entra con su sesión de TOKA: no hay registro ni login propio. Toca el ícono para continuar o pasa al siguiente paso.', setup:S=>{ base(S); }},
  {ch:'Mini program', tab:'mini', title:'Inicio: la oferta de paquetes', text:'El Inicio muestra los paquetes sin pantallas intermedias: Destacados, Más vendidos y un bloque por destino. Desliza las secciones horizontalmente y baja para ver todos los bloques.', setup:S=>{ base(S); S.state.mini.screen='home'; }},
  {ch:'Mini program', tab:'mini', title:'Filtro por destino', text:'El selector muestra cada destino con su cantidad de paquetes activos. Latinoamérica tiene 0 porque sus paquetes están desactivados en el administrador.', setup:S=>{ base(S); Object.assign(S.state.mini,{screen:'home', sheet:'dest'}); }},
  {ch:'Mini program', tab:'mini', title:'Destino y orden combinados', text:'Europa con «Precio: menor a mayor» muestra solo los paquetes de Europa, del más económico al más caro. Desaparecen las secciones Destacados, Más vendidos y los bloques.', setup:S=>{ base(S); Object.assign(S.state.mini,{screen:'home', dest:'Europa', sort:'asc'}); }},
  {ch:'Mini program', tab:'mini', title:'Destino sin paquetes', text:'Si el destino elegido no tiene paquetes activos aparece un mensaje y el botón para volver a todos los destinos.', setup:S=>{ base(S); Object.assign(S.state.mini,{screen:'home', dest:'Latinoamérica'}); }},
  {ch:'Mini program', tab:'mini', title:'Detalle del paquete', text:'Carrusel de 1 a 5 imágenes, precios de adulto y niño, fecha de disponibilidad y descripción completa. Toca «Ver descripción completa» para expandirla.', setup:S=>{ base(S); S.openDetail('turquia'); }},
  {ch:'Mini program', tab:'mini', title:'Selección de viajeros', text:'Los contadores calculan el total en vivo: 2 adultos × USD 2,338 + 1 niño × USD 1,800 = USD 6,476. Prueba los botones − y +. Adultos tiene mínimo 1 y Niños mínimo 0.', setup:S=>{ base(S); S.openDetail('turquia'); Object.assign(S.state.mini,{a:2, k:1}); }},
  {ch:'Mini program', tab:'mini', title:'Paquete sin precio de niño', text:'Tailandia y Bali no tiene precio de niño cargado en el administrador, por eso no muestra la tarjeta de precio de niño ni el contador de Niños.', setup:S=>{ base(S); S.openDetail('tailandia'); }},
  {ch:'Mini program', tab:'mini', title:'Agregar al carrito', text:'Al agregar aparece «Agregado al carrito» con la opción Ir al carrito, y el indicador del menú se actualiza.', setup:S=>{ base(S); S.openDetail('turquia'); Object.assign(S.state.mini,{a:2, k:1}); S.addToCart(); }},
  {ch:'Mini program', tab:'mini', title:'Paquete que ya está en el carrito', text:'Si el paquete ya está en el carrito, los contadores muestran sus cantidades y el botón cambia a Actualizar carrito.', setup:S=>{ base(S); cartTD(S); S.openDetail('turquia'); }},
  {ch:'Mini program', tab:'mini', title:'Carrito: paquetes y total', text:'Cada paquete muestra sus contadores y subtotal. El total se recalcula al cambiar cantidades o eliminar paquetes. Todo se paga en un solo pago.', setup:S=>{ base(S); cartTD(S); S.state.mini.screen='cart'; }},
  {ch:'Mini program', tab:'mini', title:'Datos del titular: usuario nuevo', text:'Para un usuario nuevo, TOKA entrega nombre, correo y celular. Documento y pasaporte los completa el usuario. Los errores aparecen debajo de cada campo y Pagar con TOKA queda deshabilitado hasta que todo sea válido.', focus:'m.cart.holder', setup:S=>{ base(S); cartTD(S); S.state.mini.screen='cart'; S.ensureForm(); S.state.mini.touched={doc:true, pass:true}; }},
  {ch:'Mini program', tab:'mini', title:'Datos del titular: usuario recurrente', text:'Andrea ya compró antes: todos sus datos aparecen llenos con la nota «Usamos los datos de tu última compra». Puede editarlos.', focus:'m.cart.holder', setup:S=>{ base(S,{user:'andrea'}); cartTD(S); S.state.mini.screen='cart'; }},
  {ch:'Mini program', tab:'mini', title:'Paquete no disponible en el carrito', text:'Europa Clásica se desactivó en el administrador mientras estaba en el carrito. Aparece como «No disponible» y el pago se bloquea hasta eliminarlo.', setup:S=>{ base(S,{user:'andrea'}); S.cart().push({pid:'europa', a:2, k:0}, {pid:'japon', a:1, k:0}); S.pkg('europa').off=true; S.state.mini.screen='cart'; }},
  {ch:'Mini program', tab:'mini', title:'Carrito vacío', text:'Sin paquetes, el carrito muestra el mensaje y el botón Explorar paquetes.', setup:S=>{ base(S); S.state.mini.screen='cart'; }},
  {ch:'Mini program', tab:'mini', title:'Pagar con TOKA', text:'Se abre la pasarela nativa de TOKA. Esa pantalla pertenece a TOKA; aquí se simula con dos botones para probar ambos resultados.', setup:S=>{ base(S,{user:'andrea'}); cartTD(S); Object.assign(S.state.mini,{screen:'cart', sheet:'pay'}); }},
  {ch:'Mini program', tab:'mini', title:'Pago exitoso', text:'Una compra genera un solo número de orden con todos los paquetes. El carrito se vacía y la orden ya aparece en el administrador.', setup:S=>{ base(S,{user:'andrea'}); cartTD(S); S.state.mini.screen='cart'; S.ensureForm(); S.approvePay(); }},
  {ch:'Mini program', tab:'mini', title:'Pago rechazado', text:'El carrito no se vacía. Reintentar pago vuelve al carrito con los paquetes y los datos intactos.', setup:S=>{ base(S,{user:'andrea'}); cartTD(S); S.state.mini.screen='cart'; S.ensureForm(); S.rejectPay(); }},
  {ch:'Mini program', tab:'mini', title:'Mis viajes', text:'Cada paquete comprado es una tarjeta. La compra #4818 incluyó dos paquetes: ambos muestran el mismo número de orden. Punta Cana se editó después de la compra y muestra el aviso de cambios.', setup:S=>{ base(S,{user:'andrea'}); S.state.mini.screen='trips'; }},
  {ch:'Mini program', tab:'mini', title:'Detalle del viaje', text:'Datos de la compra, del titular, mensaje del asesor e información actual del paquete. El valor pagado (USD 2,870) se conserva aunque hoy el precio sea otro.', setup:S=>{ base(S,{user:'andrea'}); Object.assign(S.state.mini,{screen:'trip', trip:{oid:4815, pid:'puntacana'}}); }},
  {ch:'Mini program', tab:'mini', title:'Mis viajes sin compras', text:'Un usuario sin compras ve el mensaje «Aún no tienes viajes».', setup:S=>{ base(S); S.state.mini.screen='trips'; }},
  {ch:'Mini program', tab:'mini', title:'Ayuda', text:'Ventana emergente sobre la pantalla actual con el correo y el teléfono de Sol Travel. Aceptar la cierra y deja al usuario donde estaba.', setup:S=>{ base(S); Object.assign(S.state.mini,{screen:'home', sheet:'help'}); }},

  /* ---- Administrador ---- */
  {ch:'Administrador', tab:'admin', title:'Ingreso', text:'Acceso para el equipo de Sol Travel. Prueba con laura.mendez@soltravel.com y la contraseña SolTravel2026.', setup:S=>{ base(S); }},
  {ch:'Administrador', tab:'admin', title:'Error de ingreso', text:'Si el correo o la contraseña son incorrectos aparece un solo mensaje, sin indicar cuál de los dos falló.', setup:S=>{ base(S); Object.assign(S.state.admin.login,{email:'laura.mendez@soltravel.com', pass:'claveincorrecta', err:true}); }},
  {ch:'Administrador', tab:'admin', title:'Recuperar contraseña', text:'El mensaje es el mismo exista o no el correo. El enlace que llega es de un solo uso y vence.', setup:S=>{ base(S); Object.assign(S.state.admin,{screen:'forgot', forgot:{email:'laura.mendez@soltravel.com', sent:true}}); }},
  {ch:'Administrador', tab:'admin', title:'Crear nueva contraseña', text:'El enlace abre esta pantalla. Las dos contraseñas deben coincidir para poder guardar.', setup:S=>{ base(S); Object.assign(S.state.admin,{screen:'reset', reset:{p1:'NuevaClave2026', p2:'NuevaClave', who:'Laura', uid:'laura', touched:true}}); }},
  {ch:'Administrador', tab:'admin', title:'Contraseña creada', text:'Al guardar, se vuelve al ingreso con el mensaje «Contraseña actualizada».', setup:S=>{ base(S); S.state.admin.screen='resetok'; }},
  {ch:'Administrador', tab:'admin', title:'Listado de paquetes', text:'Pantalla principal. La pestaña Activos lista lo que hoy se ve en TOKA, con su estado y marca. Usa el buscador o el filtro de destino.', setup:S=>{ base(S,{admin:true}); S.state.admin.screen='packages'; }},
  {ch:'Administrador', tab:'admin', title:'Paquetes inactivos', text:'Programados (la vigencia no ha empezado), Vencidos (ya terminó) y Desactivados. Ninguno se ve en TOKA. Aquí aparece el filtro de estado.', setup:S=>{ base(S,{admin:true}); Object.assign(S.state.admin,{screen:'packages', tab:'inactive'}); }},
  {ch:'Administrador', tab:'admin', title:'Crear paquete: validaciones', text:'Publicar se habilita solo con todos los obligatorios válidos. Así se ven los errores al intentar publicar sin datos. Puedes llenar el formulario y cargar tus propias imágenes.', setup:S=>{ base(S,{admin:true}); S.openForm('create'); S.state.admin.form.tried=true; }},
  {ch:'Administrador', tab:'admin', title:'Duplicar un paquete', text:'Copia todos los datos, incluidas las imágenes, y agrega « (copia)» al nombre. La marca no se copia. La fecha de inicio pasada debe actualizarse antes de publicar.', setup:S=>{ base(S,{admin:true}); S.openForm('dup','turquia'); }},
  {ch:'Administrador', tab:'admin', title:'Marcas: límite de 3 activos', text:'Ya hay 3 paquetes activos Destacados, por eso la casilla se deshabilita con el mensaje del límite. Si la vigencia empezara en el futuro (Programado), sí se podría marcar.', focus:'a.f.marks', setup:S=>{ base(S,{admin:true}); S.openForm('create'); Object.assign(S.state.admin.form.f,{start:today(), end:'2027-06-30'}); }},
  {ch:'Administrador', tab:'admin', title:'Vista del paquete', text:'Todos los campos en solo lectura, estado actual y cuántas órdenes pagadas lo incluyen. Desde aquí se edita, se desactiva o se activa.', setup:S=>{ base(S,{admin:true}); Object.assign(S.state.admin,{screen:'view', view:'turquia'}); }},
  {ch:'Administrador', tab:'admin', title:'Editar un paquete con compras', text:'Antes de publicar cambios en un paquete con órdenes, el administrador ve cuántas compras tiene y que esos compradores verán el aviso de cambios.', setup:S=>{ base(S,{admin:true}); S.openForm('edit','turquia'); S.state.admin.form.f.adult='2450.00'; S.state.admin.dialog='confirmEdit'; }},
  {ch:'Administrador', tab:'admin', title:'Desactivar un paquete', text:'Pide confirmación. El paquete deja de verse en TOKA y queda «No disponible» en los carritos. Las compras ya realizadas no cambian. Los paquetes no se eliminan.', setup:S=>{ base(S,{admin:true}); Object.assign(S.state.admin,{screen:'view', view:'turquia', dialog:'deactivate'}); }},
  {ch:'Administrador', tab:'admin', title:'Salir sin publicar', text:'Si se cancela con información ingresada, el administrador confirma antes de perderla.', setup:S=>{ base(S,{admin:true}); S.openForm('create'); S.state.admin.form.f.name='Cartagena Colonial'; S.state.admin.dialog='leave'; }},
  {ch:'Administrador', tab:'admin', title:'Órdenes', text:'Historial de compras pagadas, de solo lectura. Filtra por paquete, ID TOKA o rango de fechas. Toca una fila para ver el detalle.', setup:S=>{ base(S,{admin:true}); S.state.admin.screen='orders'; }},
  {ch:'Administrador', tab:'admin', title:'Exportar órdenes', text:'Descarga en Excel o CSV todas las órdenes que cumplen los filtros, con una fila por paquete comprado. Prueba la descarga.', setup:S=>{ base(S,{admin:true}); Object.assign(S.state.admin,{screen:'orders', from:'2026-09-01', to:'2026-10-09', exportOpen:true}); }},
  {ch:'Administrador', tab:'admin', title:'Detalle de la orden', text:'Paquetes con precios unitarios del momento de la compra, total pagado y datos del titular.', setup:S=>{ base(S,{admin:true}); Object.assign(S.state.admin,{screen:'order', order:4817}); }},
  {ch:'Administrador', tab:'admin', title:'Usuarios', text:'Máximo 3 administradores con los mismos permisos. Un usuario no puede eliminarse a sí mismo.', setup:S=>{ base(S,{admin:true}); S.state.admin.screen='users'; }},
  {ch:'Administrador', tab:'admin', title:'Crear usuario', text:'Solo nombre y correo. El nuevo usuario recibe un correo para definir su propia contraseña; nadie más la escribe.', setup:S=>{ base(S,{admin:true}); Object.assign(S.state.admin,{screen:'users', udlg:{kind:'create', name:'Marta Ruiz Gómez', email:'marta.ruiz@soltravel.com', touched:{}}}); }},
  {ch:'Administrador', tab:'admin', title:'Límite de 3 usuarios', text:'Con 3 usuarios, Crear usuario se deshabilita. Toca «Ver correo» en el mensaje para ver la pantalla que abre el nuevo usuario.', setup:S=>{ base(S,{admin:true}); S.state.admin.screen='users'; S.state.admin.udlg={kind:'create', name:'Marta Ruiz Gómez', email:'marta.ruiz@soltravel.com', touched:{}}; S.saveUser(); }},
  {ch:'Administrador', tab:'admin', title:'Eliminar usuario', text:'Pide confirmación. Si solo queda un usuario, Eliminar se deshabilita.', setup:S=>{ base(S,{admin:true}); Object.assign(S.state.admin,{screen:'users', udlg:{kind:'delete', uid:'carlos', name:'Carlos Rincón Pardo'}}); }},

  /* ---- Conexión ---- */
  {ch:'Admin ↔ TOKA', tab:'admin', title:'Publicar un paquete nuevo', text:'Se publicó «Cartagena Colonial» (Caribe) con vigencia activa. En el siguiente paso lo verás en el mini program, sin intervención de un desarrollador.', setup:S=>{ base(S,{admin:true}); S.openForm('create'); Object.assign(S.state.admin.form.f,{name:'Cartagena Colonial', dest:'Caribe', dur:'5 días / 4 noches', imgs:['assets/p/cartagena.jpg'], desc:'Ciudad amurallada, Getsemaní e Islas del Rosario.\n\nITINERARIO\nDía 1 · Llegada.\nDías 2 a 4 · Ciudad amurallada e Islas del Rosario.\nDía 5 · Regreso.', adult:'980.00', child:'640.00', start:today(), end:'2027-06-30'}); S.publish(); }},
  {ch:'Admin ↔ TOKA', tab:'mini', title:'…y aparece en TOKA', text:'El paquete recién publicado aparece primero en el bloque Caribe, por ser el más reciente, y en el filtro de destino.', focus:'m.home.card', setup:S=>{ if(!S.state.packages.some(p=>p.name==='Cartagena Colonial')) TOUR[TOUR.findIndex(t=>t.title==='Publicar un paquete nuevo')].setup(S); Object.assign(S.state.mini,{screen:'home', dest:'Caribe', sort:'rec', sheet:null}); }},
  {ch:'Admin ↔ TOKA', tab:'admin', title:'Desactivar un paquete que está en carritos', text:'Andrea tiene Turquía y Dubái en su carrito. El administrador lo desactiva.', setup:S=>{ base(S,{admin:true, user:'andrea'}); cartTD(S); Object.assign(S.state.admin,{screen:'view', view:'turquia', dialog:'deactivate'}); }},
  {ch:'Admin ↔ TOKA', tab:'mini', title:'…y queda «No disponible»', text:'En el carrito de Andrea el paquete aparece como «No disponible» y el pago se bloquea hasta eliminarlo. Elimínalo para ver cómo se habilita Pagar con TOKA.', setup:S=>{ if(!S.pkg('turquia').off){ base(S,{admin:true, user:'andrea'}); cartTD(S); S.pkg('turquia').off=true; } Object.assign(S.state.mini,{user:'andrea', screen:'cart', sheet:null}); }},
  {ch:'Admin ↔ TOKA', tab:'admin', title:'Editar un paquete ya comprado', text:'Nueva York Express tiene compras. Al publicar cambios, el administrador confirma que los compradores verán el aviso.', setup:S=>{ base(S,{admin:true, user:'andrea'}); S.openForm('edit','nyc'); S.state.admin.form.f.dur='7 días / 6 noches'; S.state.admin.dialog='confirmEdit'; }},
  {ch:'Admin ↔ TOKA', tab:'mini', title:'…y el comprador ve el aviso', text:'En Mis viajes de Andrea, Nueva York Express ahora muestra «Este paquete ha tenido cambios, revísalo con tu asesor».', setup:S=>{ if(!(S.pkg('nyc').edited)){ base(S,{admin:true, user:'andrea'}); S.openForm('edit','nyc'); S.state.admin.form.f.dur='7 días / 6 noches'; S.publish(); } Object.assign(S.state.mini,{user:'andrea', screen:'trips', sheet:null}); }},
  {ch:'Admin ↔ TOKA', tab:'mini', title:'Una compra en TOKA…', text:'Mario completa sus datos y paga. Toca «Aprobar pago» para confirmar la compra.', setup:S=>{ base(S,{admin:true}); cartTD(S); S.state.mini.screen='cart'; S.ensureForm(); Object.assign(S.state.mini.form,{doc:'HEMA900215', pass:'G55120334'}); S.state.mini.sheet='pay'; }},
  {ch:'Admin ↔ TOKA', tab:'admin', title:'…llega a Órdenes', text:'La orden aparece primera en Órdenes con su número, fecha y hora, ID TOKA y los datos del titular. Ábrela para ver el detalle.', focus:'a.o.table', setup:S=>{ if(!S.state.orders.some(o=>o.user==='mario')){ base(S,{admin:true}); cartTD(S); S.state.mini.screen='cart'; S.ensureForm(); Object.assign(S.state.mini.form,{doc:'HEMA900215', pass:'G55120334'}); S.approvePay(); } Object.assign(S.state.admin,{me:'laura', screen:'orders', oq:'', otk:'', from:'', to:'', opage:1, dialog:null, udlg:null, form:null}); }}
];

/* ============ Contenido de referencia ============ */
const REF = {
  intro: [
    'Sol Travel es un mayorista de turismo con sede en Bogotá que comercializa paquetes internacionales. Hoy vende a través de flyers, WhatsApp y su sitio web, y cada venta depende de que un asesor atienda al interesado.',
    'Este proyecto crea un nuevo canal de venta dentro de TOKA, la super app mexicana construida sobre el framework de mini programs de Alipay. El usuario de TOKA podrá consultar los paquetes de Sol Travel, agregarlos a un carrito y pagarlos con la pasarela de TOKA, sin salir de la aplicación. Una vez confirmado el pago, un asesor de Sol Travel se comunica con el comprador para definir las fechas del viaje y recoger los datos de los demás viajeros.'
  ],
  parts: [
    {k:'mini', title:'Mini program', text:'La experiencia de consulta y compra para el usuario de TOKA.', list:['Inicio con filtros por destino y orden','Detalle del paquete y selección de viajeros','Carrito, datos del titular y pago con TOKA','Mis viajes y Ayuda']},
    {k:'admin', title:'Administrador web', text:'La herramienta donde el equipo de Sol Travel publica y gestiona los paquetes, consulta las ventas y administra los usuarios con acceso.', list:['Acceso y recuperación de contraseña','Paquetes: crear, duplicar, editar, desactivar','Órdenes con filtros y exportación','Usuarios administradores (máximo 3)']}
  ],
  estados: [
    ['Activo','Dentro de la vigencia y sin desactivar','Sí','Activos'],
    ['Programado','La vigencia todavía no inicia','No','Inactivos'],
    ['Vencido','La vigencia ya terminó','No','Inactivos'],
    ['Desactivado','El administrador lo desactivó','No','Inactivos']
  ],
  reglasMini: ['El usuario entra con su sesión de TOKA. No hay registro ni login propio.','Idioma: español.','Precios en dólares, con formato «USD 1,250.00», e impuestos incluidos. La conversión a pesos mexicanos al momento del pago la realiza la pasarela de TOKA.','El menú inferior está siempre visible y tiene cuatro opciones: Inicio, Carrito, Mis viajes y Ayuda.','La opción Carrito muestra un indicador con la cantidad de paquetes agregados.','Solo se muestran paquetes en estado Activo: dentro de su vigencia y sin desactivar.'],
  reglasAdmin: ['Aplicación web para computador, en español.','Mínimo 1 y máximo 3 usuarios administradores, todos con los mismos permisos.','Los paquetes no se eliminan; solo se desactivan.','Precios en dólares (USD).'],
  fuera: ['Eliminar paquetes; solo se desactivan.','Marcar órdenes como contactadas o cambiar su estado. El historial de órdenes es de solo lectura.','Roles o permisos distintos entre administradores.','Editar los datos de contacto que se muestran en la sección Ayuda del mini program.','La pantalla de la pasarela de pago pertenece a TOKA y no forma parte del diseño del mini program.'],
  confirmar: ['Precios en dólares (USD) con impuestos incluidos, en el mini program y en el administrador.','La conversión a pesos mexicanos al momento del pago la realiza la pasarela de TOKA.']
};

window.SolDocs = { SCREENS, EXTRA, screenKey, INDEX, SIMS, TOUR, REF };
})();
