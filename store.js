(function(){
if (window.SolStore) return;
const TODAY = new Date(2026, 9, 13, 10, 30);
const DESTS = ['Caribe','Estados Unidos','Europa','Medio Oriente','Oriente','Latinoamérica'];
const BLOCKS = ['Europa','Medio Oriente','Estados Unidos','Oriente','Caribe','Latinoamérica'];
const IMG = k => 'assets/p/' + k + '.jpg';
const MS = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];
const MS2 = ['ene','feb','mar','abr','may','jun','jul','ago','sept','oct','nov','dic'];
const ML = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
const pad = n => String(n).padStart(2,'0');
const D = s => { const [y,m,d] = s.split('-').map(Number); return new Date(y, m-1, d); };
const iso = d => d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate());
const fmt = {
  usd: n => 'USD ' + Number(n||0).toLocaleString('en-US',{minimumFractionDigits:2, maximumFractionDigits:2}),
  short: s => { const d = typeof s==='string'?D(s):s; return d.getDate()+' '+MS[d.getMonth()]+' '+d.getFullYear(); },
  short2: s => { const d = typeof s==='string'?D(s):s; return d.getDate()+' '+MS2[d.getMonth()]+' '+d.getFullYear(); },
  long: s => { const d = typeof s==='string'?D(s):s; return d.getDate()+' de '+ML[d.getMonth()]+' de '+d.getFullYear(); },
  dt: d => pad(d.getDate())+'/'+pad(d.getMonth()+1)+'/'+d.getFullYear()+', '+pad(d.getHours())+':'+pad(d.getMinutes()),
  trav: (a,k) => a+(a===1?' adulto':' adultos')+(k?', '+k+(k===1?' niño':' niños'):''),
  D, iso
};
const COMMON_NO = '• Gastos personales y propinas\n• Comidas no especificadas\n• Seguro de viaje (consúltalo con tu asesor)';
const COND = 'CONDICIONES\n• Precios por persona en acomodación doble, sujetos a disponibilidad.\n• Un asesor confirmará contigo las fechas exactas del viaje.\n• Pasaporte con vigencia mínima de 6 meses.';
const desc = (intro, itin, fechas, inc, no) => intro + '\n\nITINERARIO\n' + itin + '\n\nFECHAS Y TEMPORADAS\n' + fechas + '\n\nQUÉ INCLUYE\n' + inc + '\n\nQUÉ NO INCLUYE\n' + (no||COMMON_NO) + '\n\n' + COND;

function seedPackages(){
  const P = (o) => Object.assign({child:null, mark:null, off:false, edited:null}, o);
  const list = [
    P({id:'turquia', name:'Turquía y Dubái', dest:'Medio Oriente', dur:'16 días / 15 noches', adult:2338, child:1800, start:'2026-08-01', end:'2027-05-31', mark:'dest',
      imgs:[IMG('turquia1'),IMG('turquia2'),IMG('turquia3'),IMG('turquia4'),IMG('turquia5')],
      desc:desc('Dos mundos en un solo viaje: la historia de Estambul y Capadocia, y el lujo moderno de Dubái.','Días 1 a 4 · Estambul: Santa Sofía, Mezquita Azul y crucero por el Bósforo.\nDías 5 a 7 · Capadocia: valles, ciudades subterráneas y vuelo en globo opcional.\nDías 8 a 9 · Pamukkale y Éfeso.\nDías 10 a 16 · Dubái: Burj Khalifa, safari en el desierto y Abu Dabi.','Salidas los sábados de noviembre de 2026 a mayo de 2027.','• Vuelos internacionales e internos\n• 15 noches de hotel 4★ con desayuno\n• Traslados aeropuerto–hotel–aeropuerto\n• Visitas guiadas en español','• Gastos personales y propinas\n• Comidas no especificadas\n• Seguro de viaje (consúltalo con tu asesor)\n• Tasas turísticas locales')}),
    P({id:'europa', name:'Europa Clásica: París, Londres y Roma', dest:'Europa', dur:'15 días / 14 noches', adult:2890, child:2150, start:'2026-08-01', end:'2027-06-30', mark:'dest', imgs:[IMG('europa'),IMG('italia'),IMG('londres')],
      desc:desc('Las tres capitales más visitadas de Europa en un solo recorrido.','Días 1 a 5 · París: Torre Eiffel, Louvre y paseo por el Sena.\nDías 6 a 9 · Londres: Big Ben, Palacio de Buckingham y Museo Británico.\nDías 10 a 15 · Roma: Coliseo, Vaticano y Fontana di Trevi.','Temporada baja: noviembre a marzo. Temporada alta: abril a junio (aplica suplemento).','• Vuelos internacionales\n• Tren Eurostar París–Londres\n• 14 noches de hotel 4★ con desayuno\n• City tour en cada ciudad','• Gastos personales y propinas\n• Comidas no especificadas\n• Seguro de viaje (consúltalo con tu asesor)\n• Tasas turísticas locales')}),
    P({id:'cancun', name:'Cancún y Riviera Maya', dest:'Caribe', dur:'7 días / 6 noches', adult:1234, child:820, start:'2026-08-01', end:'2027-05-31', imgs:[IMG('cancun')],
      desc:desc('Playas turquesa, cenotes y zona arqueológica en el Caribe mexicano.','Día 1 · Llegada a Cancún y registro en el hotel.\nDías 2 a 3 · Playa y día libre.\nDía 4 · Tulum y cenotes.\nDías 5 a 6 · Isla Mujeres y día libre.\nDía 7 · Regreso.','Salidas diarias de agosto de 2026 a mayo de 2027.','• Vuelos internacionales\n• 6 noches en hotel 4★ todo incluido\n• Traslados aeropuerto–hotel–aeropuerto')}),
    P({id:'dubai', name:'Dubái de Lujo', dest:'Medio Oriente', dur:'7 días / 6 noches', adult:1980, child:1450, start:'2026-08-01', end:'2027-04-30', imgs:[IMG('dubai'),IMG('turquia5')],
      desc:desc('Rascacielos, desierto y compras en la ciudad más moderna del Golfo.','Día 1 · Llegada y registro en el hotel.\nDías 2 a 3 · Burj Khalifa, Dubai Mall y Marina.\nDía 4 · Safari en el desierto con cena.\nDías 5 a 6 · Abu Dabi y día libre.\nDía 7 · Regreso.','Salidas los jueves de agosto de 2026 a abril de 2027.','• Vuelos internacionales\n• 6 noches de hotel 5★ con desayuno\n• Safari en el desierto\n• Traslados aeropuerto–hotel–aeropuerto')}),
    P({id:'japon', name:'Japón Esencial', dest:'Oriente', dur:'12 días / 11 noches', adult:3450, child:2890, start:'2026-08-01', end:'2027-04-30', mark:'dest', imgs:[IMG('japon'),IMG('japonprim')],
      desc:desc('Tradición y tecnología: de los templos de Kioto a los barrios de Tokio.','Días 1 a 5 · Tokio: Shibuya, Asakusa y monte Fuji.\nDías 6 a 8 · Kioto: templos, Gion y bosque de bambú.\nDía 9 · Nara.\nDías 10 a 12 · Osaka y regreso.','Salidas quincenales de agosto de 2026 a abril de 2027.','• Vuelos internacionales\n• 11 noches de hotel 4★ con desayuno\n• Japan Rail Pass de 7 días\n• Visitas guiadas en español')}),
    P({id:'nyc', name:'Nueva York Express', dest:'Estados Unidos', dur:'6 días / 5 noches', adult:1450, child:1100, start:'2026-08-01', end:'2027-03-31', mark:'best', imgs:[IMG('nyc')],
      desc:desc('La Gran Manzana en una semana: Manhattan, Brooklyn y Broadway.','Día 1 · Llegada y registro en el hotel.\nDía 2 · Alto y bajo Manhattan.\nDía 3 · Estatua de la Libertad y Brooklyn.\nDías 4 a 5 · Días libres para compras y museos.\nDía 6 · Regreso.','Salidas diarias de agosto de 2026 a marzo de 2027.','• Vuelos internacionales\n• 5 noches de hotel 3★ en Manhattan\n• City tour\n• Traslados aeropuerto–hotel–aeropuerto')}),
    P({id:'puntacana', name:'Punta Cana Todo Incluido', dest:'Caribe', dur:'7 días / 6 noches', adult:1150, child:690, start:'2026-08-01', end:'2027-04-15', mark:'best', imgs:[IMG('puntacana'),IMG('puntacana2'),IMG('puntacana3')], edited: new Date(2026,8,28,11,0),
      desc:desc('Playas de arena blanca y un resort todo incluido frente al mar.','Día 1 · Llegada y registro en el resort.\nDías 2 a 6 · Días libres de playa. Excursión opcional a Isla Saona.\nDía 7 · Regreso.','Salidas diarias de noviembre de 2026 a abril de 2027.','• Vuelos internacionales\n• 6 noches en resort 5★ todo incluido\n• Traslados aeropuerto–hotel–aeropuerto','• Gastos personales y propinas\n• Excursiones opcionales\n• Seguro de viaje (consúltalo con tu asesor)')}),
    P({id:'tailandia', name:'Tailandia y Bali', dest:'Oriente', dur:'14 días / 13 noches', adult:2690, child:null, start:'2026-08-01', end:'2027-04-30', imgs:[IMG('tailandia')],
      desc:desc('Templos, mercados flotantes y playas de Bali en un mismo viaje.','Días 1 a 4 · Bangkok: Gran Palacio y mercados flotantes.\nDías 5 a 7 · Chiang Mai.\nDías 8 a 14 · Bali: Ubud, terrazas de arroz y playas de Seminyak.','Salidas los martes de agosto de 2026 a abril de 2027.','• Vuelos internacionales e internos\n• 13 noches de hotel 4★ con desayuno\n• Traslados aeropuerto–hotel–aeropuerto')}),
    P({id:'grecia', name:'Grecia: Atenas y Santorini', dest:'Europa', dur:'9 días / 8 noches', adult:2450, child:1890, start:'2026-08-01', end:'2027-06-30', mark:'best', imgs:[IMG('grecia')],
      desc:desc('Historia clásica en Atenas y atardeceres sobre el Egeo en Santorini.','Días 1 a 4 · Atenas: Acrópolis, Plaka y cabo Sunión.\nDías 5 a 9 · Santorini: Oia, Fira y paseo en catamarán.','Temporada alta: mayo a septiembre (aplica suplemento).','• Vuelos internacionales\n• Ferry Atenas–Santorini\n• 8 noches de hotel 4★ con desayuno')}),
    P({id:'miami', name:'Miami Beach', dest:'Estados Unidos', dur:'7 días / 6 noches', adult:1290, child:950, start:'2026-08-01', end:'2027-05-31', imgs:[IMG('miami')],
      desc:desc('Playa, compras y vida nocturna en South Beach.','Día 1 · Llegada y registro en el hotel.\nDías 2 a 6 · Días libres. Excursión opcional a los Everglades.\nDía 7 · Regreso.','Salidas diarias de agosto de 2026 a mayo de 2027.','• Vuelos internacionales\n• 6 noches de hotel 4★ frente al mar\n• Traslados aeropuerto–hotel–aeropuerto')}),
    P({id:'egipto', name:'Egipto Milenario', dest:'Medio Oriente', dur:'10 días / 9 noches', adult:2050, child:1540, start:'2026-08-01', end:'2027-06-30', imgs:[IMG('egipto')],
      desc:desc('Pirámides, templos y un crucero por el Nilo.','Días 1 a 3 · El Cairo: pirámides de Guiza y Museo Egipcio.\nDías 4 a 7 · Crucero por el Nilo: Luxor, Edfu y Kom Ombo.\nDías 8 a 10 · Asuán, Abu Simbel y regreso.','Salidas los lunes de agosto de 2026 a junio de 2027.','• Vuelos internacionales e internos\n• 5 noches de hotel y 4 noches de crucero con pensión completa\n• Visitas guiadas en español')}),
    P({id:'costaoeste', name:'Costa Oeste: Los Ángeles, Las Vegas y San Francisco', dest:'Estados Unidos', dur:'12 días / 11 noches', adult:2780, child:2100, start:'2026-08-01', end:'2027-06-30', imgs:[IMG('costaoeste')],
      desc:desc('Tres ciudades icónicas y los parques nacionales del oeste.','Días 1 a 4 · Los Ángeles: Hollywood y Santa Mónica.\nDías 5 a 7 · Las Vegas y Gran Cañón.\nDías 8 a 12 · San Francisco: Golden Gate y Alcatraz.','Salidas los viernes de agosto de 2026 a junio de 2027.','• Vuelos internacionales e internos\n• 11 noches de hotel 3★\n• Excursión al Gran Cañón')}),
    P({id:'singapur', name:'Singapur Moderno', dest:'Oriente', dur:'6 días / 5 noches', adult:1890, child:null, start:'2026-08-01', end:'2027-05-31', imgs:[IMG('singapur')],
      desc:desc('Arquitectura futurista, jardines y gastronomía de toda Asia.','Día 1 · Llegada y registro en el hotel.\nDía 2 · Marina Bay y Gardens by the Bay.\nDía 3 · Sentosa.\nDías 4 a 5 · Chinatown, Little India y día libre.\nDía 6 · Regreso.','Salidas diarias de agosto de 2026 a mayo de 2027.','• Vuelos internacionales\n• 5 noches de hotel 4★ con desayuno\n• Traslados aeropuerto–hotel–aeropuerto')}),
    P({id:'italia', name:'Italia Romántica', dest:'Europa', dur:'10 días / 9 noches', adult:2190, child:1650, start:'2026-08-01', end:'2027-06-30', imgs:[IMG('italia'),IMG('europa')],
      desc:desc('Venecia, Florencia y Roma en tren de alta velocidad.','Días 1 a 3 · Venecia: canales y paseo en góndola.\nDías 4 a 6 · Florencia y Toscana.\nDías 7 a 10 · Roma y regreso.','Temporada baja: noviembre a marzo. Temporada alta: abril a junio (aplica suplemento).','• Vuelos internacionales\n• Trenes de alta velocidad entre ciudades\n• 9 noches de hotel 4★ con desayuno')}),
    P({id:'aruba', name:'Aruba Feliz', dest:'Caribe', dur:'6 días / 5 noches', adult:1590, child:1190, start:'2026-08-01', end:'2027-05-31', imgs:[IMG('aruba')],
      desc:desc('Sol todo el año y playas tranquilas en el Caribe holandés.','Día 1 · Llegada y registro en el hotel.\nDías 2 a 5 · Días libres de playa. Excursión opcional en catamarán.\nDía 6 · Regreso.','Salidas diarias de agosto de 2026 a mayo de 2027.','• Vuelos internacionales\n• 5 noches en hotel 4★ todo incluido\n• Traslados aeropuerto–hotel–aeropuerto')}),
    P({id:'japonprim', name:'Japón en Primavera', dest:'Oriente', dur:'10 días / 9 noches', adult:3790, child:3190, start:'2027-01-15', end:'2027-04-30', imgs:[IMG('japonprim'),IMG('japon')],
      desc:desc('La temporada de los cerezos en flor entre Tokio y Kioto.','Días 1 a 4 · Tokio y parque Ueno.\nDías 5 a 8 · Kioto y Nara.\nDías 9 a 10 · Osaka y regreso.','Salidas de marzo a abril de 2027.','• Vuelos internacionales\n• 9 noches de hotel 4★ con desayuno\n• Japan Rail Pass de 7 días')}),
    P({id:'peru', name:'Perú Mágico: Lima, Cusco y Machu Picchu', dest:'Latinoamérica', dur:'8 días / 7 noches', adult:1790, child:1350, start:'2026-08-01', end:'2027-06-30', off:true, imgs:[IMG('peru')],
      desc:desc('Gastronomía limeña, el Valle Sagrado y la ciudadela inca.','Días 1 a 2 · Lima.\nDías 3 a 5 · Cusco y Valle Sagrado.\nDía 6 · Machu Picchu.\nDías 7 a 8 · Cusco y regreso.','Salidas diarias de agosto de 2026 a junio de 2027.','• Vuelos internacionales e internos\n• 7 noches de hotel 3★ con desayuno\n• Tren a Machu Picchu y entrada')}),
    P({id:'rio', name:'Río de Janeiro', dest:'Latinoamérica', dur:'6 días / 5 noches', adult:1320, child:980, start:'2026-08-01', end:'2027-03-31', off:true, imgs:[IMG('rio')],
      desc:desc('Playas de Copacabana, el Cristo Redentor y el Pan de Azúcar.','Día 1 · Llegada.\nDías 2 a 5 · Cristo Redentor, Pan de Azúcar y playas.\nDía 6 · Regreso.','Salidas diarias de agosto de 2026 a marzo de 2027.','• Vuelos internacionales\n• 5 noches de hotel 4★ con desayuno')}),
    P({id:'londres', name:'Londres Navideño', dest:'Europa', dur:'5 días / 4 noches', adult:1690, child:null, start:'2026-08-01', end:'2026-12-31', off:true, imgs:[IMG('londres')],
      desc:desc('Mercados navideños y luces de temporada en Londres.','Día 1 · Llegada.\nDías 2 a 4 · Mercados navideños, Oxford Street y Hyde Park Winter Wonderland.\nDía 5 · Regreso.','Salidas en diciembre de 2026.','• Vuelos internacionales\n• 4 noches de hotel 4★ con desayuno')}),
    P({id:'buenosaires', name:'Buenos Aires y Tango', dest:'Latinoamérica', dur:'6 días / 5 noches', adult:1450, child:null, start:'2026-08-01', end:'2027-05-31', off:true, imgs:[IMG('buenosaires')],
      desc:desc('Barrios porteños, parrilla y una noche de tango.','Día 1 · Llegada.\nDías 2 a 5 · San Telmo, La Boca, Recoleta y show de tango.\nDía 6 · Regreso.','Salidas diarias de agosto de 2026 a mayo de 2027.','• Vuelos internacionales\n• 5 noches de hotel 4★ con desayuno\n• Cena show de tango')}),
    P({id:'cartagena', name:'Cartagena de Indias', dest:'Caribe', dur:'5 días / 4 noches', adult:690, child:450, start:'2026-06-01', end:'2026-09-30', imgs:[IMG('cartagena')],
      desc:desc('Ciudad amurallada e Islas del Rosario.','Día 1 · Llegada.\nDías 2 a 4 · Ciudad amurallada e Islas del Rosario.\nDía 5 · Regreso.','Salidas de junio a septiembre de 2026.','• Vuelos internacionales\n• 4 noches de hotel 4★ con desayuno')})
  ];
  const order = ['turquia','europa','cancun','dubai','japon','nyc','puntacana','tailandia','grecia','miami','egipto','costaoeste','singapur','italia','aruba','japonprim','peru','rio','londres','buenosaires','cartagena'];
  list.forEach(p => { p.created = 1000 - order.indexOf(p.id); });
  return list;
}

const HOLDERS = {
  'Daniela Ríos':['DR910214','G51200871','daniela.rios@correo.mx','5523419087'],
  'Andrea Gómez Ruiz':['GORA850412','G48215563','andrea.gomez@correo.mx','5512345678'],
  'Fernanda Castillo':['FC880323','G44145201','fer.castillo@correo.mx','5569524933'],
  'Valeria Torres Díaz':['VT900611','G40022119','valeria.torres@correo.mx','5540981276'],
  'Andrés Cabrera':['AC870905','G43381550','andres.cabrera@correo.mx','5531150294'],
  'Ricardo Mendoza':['RM820117','G47719031','ricardo.mendoza@correo.mx','5590023114'],
  'Natalia Herrera':['NH930728','G49984127','natalia.herrera@correo.mx','5577120983'],
  'Jorge Salinas':['JS790302','G41188420','jorge.salinas@correo.mx','5528830117'],
  'Mariana López':['ML950419','G46601553','mariana.lopez@correo.mx','5561247790'],
  'Luis Fernando Ortiz':['LO860830','G42257718','luisf.ortiz@correo.mx','5583310442'],
  'Paola Ramírez':['PR910101','G45539902','paola.ramirez@correo.mx','5519908231']
};
const holder = n => { const h = HOLDERS[n]; return {name:n, doc:h[0], pass:h[1], email:h[2], phone:h[3]}; };

function seedOrders(P){
  const by = id => P.find(p=>p.id===id);
  const it = (id,a,k,pa,pk) => { const p = by(id); return {pid:id, name:p.name, dest:p.dest, a, k, pa: pa ?? p.adult, pk: k ? (pk ?? p.child) : null}; };
  const O = (id, d, tk, h, items, user) => ({id, date:d, toka:tk, user:user||null, holder:holder(h), items, total: items.reduce((s,i)=>s+i.a*i.pa+(i.k||0)*(i.pk||0),0)});
  const out = [
    O(4819, new Date(2026,9,4,22,30), 'TK2834197282', 'Daniela Ríos', [it('turquia',2,1)]),
    O(4818, new Date(2026,9,1,16,5), 'TK5692421197', 'Andrea Gómez Ruiz', [it('nyc',2,0), it('dubai',1,0)], 'andrea'),
    O(4817, new Date(2026,8,27,15,10), 'TK9186269044', 'Fernanda Castillo', [it('grecia',2,2), it('italia',2,0)]),
    O(4816, new Date(2026,8,20,20,42), 'TK6244350932', 'Valeria Torres Díaz', [it('japon',2,0)]),
    O(4815, new Date(2026,8,15,18,20), 'TK0258294343', 'Andrea Gómez Ruiz', [it('puntacana',2,1,1090,690)], 'andrea'),
    O(4814, new Date(2026,8,15,5,0), 'TK0360237360', 'Andrés Cabrera', [it('tailandia',2,0)]),
    O(4813, new Date(2026,8,13,21,43), 'TK9420850276', 'Daniela Ríos', [it('nyc',2,2)]),
    O(4812, new Date(2026,8,12,20,26), 'TK9955729246', 'Ricardo Mendoza', [it('peru',2,2)]),
    O(4811, new Date(2026,8,11,17,9), 'TK8601936101', 'Ricardo Mendoza', [it('japon',3,1)]),
    O(4810, new Date(2026,8,10,14,52), 'TK4195771217', 'Natalia Herrera', [it('singapur',2,0)])
  ];
  const names = Object.keys(HOLDERS).filter(n=>n!=='Andrea Gómez Ruiz');
  const pool = ['cancun','europa','miami','egipto','grecia','dubai','aruba','costaoeste','italia','puntacana','tailandia','singapur','japon','nyc'];
  let seed = 7; const rnd = () => (seed = (seed*9301+49297)%233280)/233280;
  const turqAt = {4806:1, 4797:1, 4783:1};
  for (let n=4809; n>=4775; n--){
    const day = new Date(2026, 7, 1 + Math.floor((n-4775)*39/35), 8+Math.floor(rnd()*13), Math.floor(rnd()*60));
    const pid = turqAt[n] ? 'turquia' : pool[Math.floor(rnd()*pool.length)];
    const p = by(pid); const a = 1+Math.floor(rnd()*3); const k = p.child && rnd()>.55 ? 1+Math.floor(rnd()*2) : 0;
    const items = [it(pid,a,k)];
    if (rnd()>.82){ const p2 = pool[Math.floor(rnd()*pool.length)]; if (p2!==pid) items.push(it(p2,2,0)); }
    out.push(O(n, day, 'TK'+String(Math.floor(1e9+rnd()*8.9e9)).padStart(10,'0'), names[Math.floor(rnd()*names.length)], items));
  }
  return out;
}

const MINI_USERS = {
  mario: {key:'mario', name:'Mario Hernández', toka:{name:'Mario Hernández', email:'mario.hernandez@correo.mx', phone:'5598761234'}},
  andrea: {key:'andrea', name:'Andrea Gómez Ruiz', toka:{name:'Andrea Gómez Ruiz', email:'andrea.gomez@correo.mx', phone:'5512345678'}}
};

function initial(){
  const packages = seedPackages();
  const orders = seedOrders(packages);
  return {
    packages, orders, nextOrder: 4820,
    saved: { andrea: holder('Andrea Gómez Ruiz'), mario: null },
    carts: { andrea: [], mario: [] },
    users: [
      {id:'laura', name:'Laura Méndez Castro', email:'laura.mendez@soltravel.com', created:'2026-07-01', pass:'SolTravel2026'},
      {id:'carlos', name:'Carlos Rincón Pardo', email:'carlos.rincon@soltravel.com', created:'2026-08-12', pass:'SolTravel2026'}
    ],
    mini: {
      user:'mario', screen:'toka', dest:'all', sort:'rec', sheet:null, toast:null,
      pid:null, img:0, descOpen:false, a:1, k:0, travOpen:true,
      form:null, touched:{}, result:null, trip:null, homeScroll:0
    },
    admin: {
      screen:'login', me:null, login:{email:'', pass:'', err:false, info:null},
      forgot:{email:'laura.mendez@soltravel.com', sent:false},
      reset:{p1:'', p2:'', who:'Laura', uid:'laura', touched:false},
      tab:'active', q:'', dest:'all', estado:'all', page:1,
      form:null, view:null, dialog:null, toast:null,
      oq:'', otk:'', from:'', to:'', opage:1, order:null, exportOpen:false,
      udlg:null, menuDest:false
    }
  };
}

const S = { state: initial(), subs: new Set(), fmt, DESTS, BLOCKS, TODAY, users: MINI_USERS };
S.subscribe = fn => { S.subs.add(fn); return () => S.subs.delete(fn); };
S.emit = () => { S.subs.forEach(f => { try { f(); } catch(e){ console.error(e); } }); };
S.setMini = patch => { Object.assign(S.state.mini, typeof patch==='function'?patch(S.state.mini):patch); S.emit(); };
S.setAdmin = patch => { Object.assign(S.state.admin, typeof patch==='function'?patch(S.state.admin):patch); S.emit(); };
S.reset = () => { S.state = initial(); S.emit(); };
S.pkg = id => S.state.packages.find(p=>p.id===id);

S.status = p => {
  if (p.off) return 'Desactivado';
  const t = new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate());
  if (D(p.start) > t) return 'Programado';
  if (D(p.end) < t) return 'Vencido';
  return 'Activo';
};
S.active = () => S.state.packages.filter(p => S.status(p)==='Activo').sort((a,b)=>b.created-a.created);
S.ordersFor = pid => S.state.orders.filter(o => o.items.some(i=>i.pid===pid)).length;

/* ---------- MINI PROGRAM ---------- */
S.home = () => {
  const m = S.state.mini; const act = S.active();
  let list = m.dest==='all' ? act : act.filter(p=>p.dest===m.dest);
  if (m.dest==='all' && m.sort==='rec'){
    const sections = [];
    const dest = act.filter(p=>p.mark==='dest').slice(0,3);
    const best = act.filter(p=>p.mark==='best').slice(0,3);
    if (dest.length) sections.push({key:'dest', title:'Destacados', kind:'dest', items:dest});
    if (best.length) sections.push({key:'best', title:'Más vendidos', kind:'best', items:best});
    BLOCKS.forEach(b => { const it = act.filter(p=>p.dest===b); if (it.length) sections.push({key:b, title:b, kind:'block', items:it, count:it.length}); });
    return {mode:'sections', sections, empty:false};
  }
  if (m.sort==='asc') list = list.slice().sort((a,b)=>a.adult-b.adult || b.created-a.created);
  if (m.sort==='desc') list = list.slice().sort((a,b)=>b.adult-a.adult || b.created-a.created);
  return {mode:'list', title: m.dest==='all'?'Todos los destinos':m.dest, items:list, count:list.length, empty:list.length===0};
};
S.destCounts = () => { const act = S.active(); const c = {all:act.length}; DESTS.forEach(d=>c[d]=act.filter(p=>p.dest===d).length); return c; };
S.cart = () => S.state.carts[S.state.mini.user];
S.cartLine = l => { const p = S.pkg(l.pid); const ok = S.status(p)==='Activo'; const k = p.child ? l.k : 0; return {p, ok, a:l.a, k, sub: ok ? l.a*p.adult + k*(p.child||0) : 0}; };
S.cartTotal = () => S.cart().map(S.cartLine).reduce((s,l)=>s+l.sub,0);

S.openDetail = (pid) => {
  const inCart = S.cart().find(l=>l.pid===pid);
  S.setMini({screen:'detail', pid, img:0, descOpen:false, a: inCart?inCart.a:1, k: inCart?inCart.k:0, travOpen:true, sheet:null, toast:null});
};
S.addToCart = () => {
  const m = S.state.mini; const cart = S.cart(); const ex = cart.find(l=>l.pid===m.pid);
  const p = S.pkg(m.pid); const k = p.child ? m.k : 0;
  if (ex){ ex.a = m.a; ex.k = k; S.setMini({toast:{text:'Carrito actualizado', action:'Ir al carrito'}}); }
  else { cart.push({pid:m.pid, a:m.a, k}); S.setMini({toast:{text:'Agregado al carrito', action:'Ir al carrito'}}); }
  clearTimeout(S._tt); S._tt = setTimeout(()=>S.setMini({toast:null}), 3500);
};
S.flashMini = (text) => { S.setMini({toast:{text}}); clearTimeout(S._tt); S._tt = setTimeout(()=>S.setMini({toast:null}), 3500); };
S.cartQty = (pid, field, delta) => {
  const l = S.cart().find(x=>x.pid===pid); if (!l) return;
  l[field] = Math.max(field==='a'?1:0, l[field]+delta); S.emit();
};
S.cartRemove = pid => { const c = S.cart(); const i = c.findIndex(l=>l.pid===pid); if (i>=0) c.splice(i,1); S.emit(); };

S.ensureForm = () => {
  const m = S.state.mini; if (m.form && m.form._user===m.user) return;
  const sv = S.state.saved[m.user]; const tk = MINI_USERS[m.user].toka;
  m.form = sv ? Object.assign({_user:m.user, _src:'saved'}, sv) : {_user:m.user, _src:'toka', name:tk.name||'', doc:'', pass:'', email:tk.email||'', phone:tk.phone||''};
  m.touched = {};
};
S.fieldErr = (f, v) => {
  v = (v||'').trim();
  if (f==='name') return v ? null : 'Ingresa tu nombre completo';
  if (f==='doc') return v ? null : 'Ingresa tu documento de identidad';
  if (f==='pass') return !v ? 'Ingresa tu número de pasaporte' : (/^[A-Za-z0-9]+$/.test(v) ? null : 'Usa solo letras y números');
  if (f==='email') return !v ? 'Ingresa tu correo electrónico' : (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? null : 'Ingresa un correo válido');
  if (f==='phone') return !v ? 'Ingresa tu celular' : (/^\d+$/.test(v) ? null : 'Usa solo números');
  return null;
};
S.formValid = () => { const f = S.state.mini.form; return !!f && ['name','doc','pass','email','phone'].every(k=>!S.fieldErr(k,f[k])); };
S.canPay = () => { const c = S.cart(); return c.length>0 && c.every(l=>S.cartLine(l).ok) && S.formValid(); };
S.approvePay = () => {
  const m = S.state.mini; const lines = S.cart().map(S.cartLine);
  const f = m.form; const h = {name:f.name.trim(), doc:f.doc.trim(), pass:f.pass.trim(), email:f.email.trim(), phone:f.phone.trim()};
  const id = S.state.nextOrder++;
  const now = new Date(TODAY.getTime()); now.setHours(10, 30 + (id-4820)*3);
  const items = lines.map(l=>({pid:l.p.id, name:l.p.name, dest:l.p.dest, a:l.a, k:l.k, pa:l.p.adult, pk:l.k?l.p.child:null}));
  const order = {id, date:now, toka:'TK'+String(5000000000+id*7919).slice(0,10), user:m.user, holder:h, items, total:lines.reduce((s,l)=>s+l.sub,0)};
  S.state.orders.unshift(order);
  S.state.saved[m.user] = h;
  S.state.carts[m.user] = [];
  m.form = null;
  S.setMini({sheet:null, screen:'result', result:{ok:true, order}});
};
S.rejectPay = () => S.setMini({sheet:null, screen:'result', result:{ok:false}});
S.trips = () => {
  const u = S.state.mini.user; const out = [];
  S.state.orders.filter(o=>o.user===u).sort((a,b)=>b.date-a.date).forEach(o => o.items.forEach(i => {
    const p = S.pkg(i.pid); out.push({o, i, p, changed: !!(p.edited && p.edited > o.date), paid: i.a*i.pa + (i.k||0)*(i.pk||0)});
  }));
  return out;
};
S.switchUser = (u) => { const m = S.state.mini; m.user = u; m.form = null; m.touched = {}; S.emit(); };

/* ---------- ADMIN ---------- */
S.adminLogin = () => {
  const a = S.state.admin; const u = S.state.users.find(x=>x.email.toLowerCase()===a.login.email.trim().toLowerCase() && x.pass===a.login.pass);
  if (!u){ a.login.err = true; a.login.info = null; S.emit(); return; }
  S.setAdmin({me:u.id, screen:'packages', login:{email:'', pass:'', err:false, info:null}, tab:'active', page:1, q:'', dest:'all'});
};
S.me = () => S.state.users.find(u=>u.id===S.state.admin.me) || S.state.users[0];
S.flashAdmin = (text, action) => { S.setAdmin({toast:{text, action}}); clearTimeout(S._ta); S._ta = setTimeout(()=>S.setAdmin({toast:null}), 4500); };
S.adminList = () => {
  const a = S.state.admin; const q = a.q.trim().toLowerCase();
  let all = S.state.packages.slice().sort((x,y)=>y.created-x.created);
  const act = all.filter(p=>S.status(p)==='Activo'), ina = all.filter(p=>S.status(p)!=='Activo');
  let list = a.tab==='active' ? act : ina;
  if (q) list = list.filter(p=>p.name.toLowerCase().includes(q));
  if (a.dest!=='all') list = list.filter(p=>p.dest===a.dest);
  if (a.tab==='inactive' && a.estado!=='all') list = list.filter(p=>S.status(p)===a.estado);
  return {list, nAct:act.length, nIna:ina.length};
};
const emptyForm = () => ({name:'', dest:'', dur:'', imgs:[], desc:'', adult:'', child:'', start:'', end:'', mark:null});
S.openForm = (mode, pid) => {
  let f = emptyForm(); let src = pid ? S.pkg(pid) : null;
  if (src){
    f = {name:src.name, dest:src.dest, dur:src.dur, imgs:src.imgs.slice(), desc:src.desc, adult:String(src.adult.toFixed(2)), child: src.child?String(src.child.toFixed(2)):'', start:src.start, end:src.end, mark: mode==='dup'?null:src.mark};
    if (mode==='dup'){ const suf = ' (copia)'; f.name = (f.name.length + suf.length > 80 ? f.name.slice(0, 80 - suf.length) : f.name) + suf; }
  }
  S.setAdmin({screen:'form', form:{mode, pid:pid||null, f, orig: JSON.stringify(f), touched: mode==='dup'?{start:true,end:true}:{}, imgErr:null}, dialog:null});
};
S.formErrors = () => {
  const F = S.state.admin.form; if (!F) return {}; const f = F.f; const e = {};
  const today = iso(TODAY);
  if (!f.name.trim()) e.name = 'Ingresa el nombre del paquete'; else if (f.name.length>80) e.name='Máximo 80 caracteres';
  if (!f.dest) e.dest = 'Elige un destino';
  if (!f.dur.trim()) e.dur = 'Ingresa la duración'; else if (f.dur.length>40) e.dur='Máximo 40 caracteres';
  if (!f.imgs.length) e.imgs = 'Agrega al menos 1 imagen';
  if (!f.desc.trim()) e.desc = 'Ingresa la descripción del paquete'; else if (f.desc.length>3000) e.desc='Máximo 3.000 caracteres';
  const money = (v, req, label) => { v = String(v).trim(); if (!v) return req ? 'Ingresa el precio '+label : null; if (!/^\d+(\.\d{1,2})?$/.test(v)) return 'Usa un número con hasta 2 decimales'; if (Number(v)<=0) return 'Debe ser mayor que 0'; return null; };
  const ea = money(f.adult, true, 'adulto'); if (ea) e.adult = ea;
  const ec = money(f.child, false, 'niño'); if (ec) e.child = ec;
  if (!f.start) e.start = 'Elige la fecha de inicio'; else if (F.mode!=='edit' && f.start < today) e.start = 'Debe ser hoy o una fecha futura';
  if (!f.end) e.end = 'Elige la fecha de fin'; else if (f.start && f.end < f.start) e.end = 'Debe ser igual o posterior a la fecha de inicio';
  return e;
};
S.formDirty = () => { const F = S.state.admin.form; return F && JSON.stringify(F.f)!==F.orig; };
S.markInfo = (kind) => {
  const F = S.state.admin.form; const f = F.f;
  const willBeActive = f.start && f.end && f.start <= iso(TODAY) && f.end >= iso(TODAY) && !(F.mode==='edit' && S.pkg(F.pid).off);
  const n = S.state.packages.filter(p => p.mark===kind && S.status(p)==='Activo' && p.id!==F.pid).length;
  const other = kind==='dest'?'best':'dest';
  const full = n>=3 && willBeActive && f.mark!==kind;
  return {n, full, otherOn: f.mark===other, disabled: f.mark===other || full};
};
S.publish = () => {
  const a = S.state.admin; const F = a.form; const f = F.f;
  const vals = {name:f.name.trim(), dest:f.dest, dur:f.dur.trim(), imgs:f.imgs.slice(), desc:f.desc, adult:Number(f.adult), child: String(f.child).trim()?Number(f.child):null, start:f.start, end:f.end, mark:f.mark};
  if (F.mode==='edit'){
    const p = S.pkg(F.pid); Object.assign(p, vals); p.edited = new Date(TODAY.getTime() + 60000*(++S._tick||(S._tick=1)) + 86400000);
    a.form = null; a.dialog = null; a.screen = 'view'; a.view = p.id; S.flashAdmin('Cambios publicados');
  } else {
    const id = 'p'+Date.now(); const created = Math.max(...S.state.packages.map(p=>p.created))+1;
    const p = Object.assign({id, created, off:false, edited:null}, vals); S.state.packages.push(p);
    a.form = null; a.dialog = null; a.screen = 'packages'; a.tab = S.status(p)==='Activo'?'active':'inactive'; a.page = 1; a.q=''; a.dest='all'; a.estado='all';
    S.flashAdmin('Paquete publicado');
  }
};
S.toggleOff = () => {
  const a = S.state.admin; const p = S.pkg(a.view); p.off = !p.off; a.dialog = null;
  S.flashAdmin(p.off ? 'Paquete desactivado' : 'Paquete activado · Estado: ' + S.status(p));
};
S.adminOrders = () => {
  const a = S.state.admin; let l = S.state.orders.slice().sort((x,y)=>y.date-x.date);
  const q = a.oq.trim().toLowerCase(); if (q) l = l.filter(o=>o.items.some(i=>i.name.toLowerCase().includes(q)));
  const tk = a.otk.trim().toLowerCase(); if (tk) l = l.filter(o=>o.toka.toLowerCase().includes(tk));
  if (a.from) l = l.filter(o=>iso(o.date) >= a.from);
  if (a.to) l = l.filter(o=>iso(o.date) <= a.to);
  return l;
};
S.exportOrders = (kind) => {
  const rows = [['Número de orden','Fecha y hora','ID TOKA','Nombre','Documento','Pasaporte','Correo','Celular','Paquete','Destino','Adultos','Precio adulto','Niños','Precio niño','Subtotal del paquete','Total de la orden']];
  S.adminOrders().forEach(o => o.items.forEach(i => rows.push(['#'+o.id, fmt.dt(o.date), o.toka, o.holder.name, o.holder.doc, o.holder.pass, o.holder.email, o.holder.phone, i.name, i.dest, i.a, i.pa.toFixed(2), i.k||0, i.pk?i.pk.toFixed(2):'', (i.a*i.pa+(i.k||0)*(i.pk||0)).toFixed(2), o.total.toFixed(2)])));
  let blob, name;
  if (kind==='csv'){ blob = new Blob(['\ufeff'+rows.map(r=>r.map(c=>'"'+String(c).replace(/"/g,'""')+'"').join(',')).join('\n')], {type:'text/csv'}); name = 'ordenes-sol-travel.csv'; }
  else { const html = '<html><head><meta charset="utf-8"></head><body><table>'+rows.map((r,i)=>'<tr>'+r.map(c=>(i?'<td>':'<th>')+String(c).replace(/</g,'&lt;')+(i?'</td>':'</th>')).join('')+'</tr>').join('')+'</table></body></html>'; blob = new Blob([html], {type:'application/vnd.ms-excel'}); name = 'ordenes-sol-travel.xls'; }
  const u = URL.createObjectURL(blob); const el = document.createElement('a'); el.href = u; el.download = name; document.body.appendChild(el); el.click(); el.remove(); setTimeout(()=>URL.revokeObjectURL(u), 2000);
  S.setAdmin({exportOpen:false}); S.flashAdmin('Descargamos '+(rows.length-1)+' filas ('+(kind==='csv'?'CSV':'Excel')+')');
};
S.userErr = (f, v, uid) => {
  v = (v||'').trim();
  if (f==='name') return !v ? 'Ingresa el nombre completo' : (v.length>80 ? 'Máximo 80 caracteres' : null);
  if (f==='email'){ if (!v) return 'Ingresa el correo'; if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return 'Ingresa un correo válido'; if (S.state.users.some(u=>u.email.toLowerCase()===v.toLowerCase() && u.id!==uid)) return 'Este correo ya está registrado'; }
  return null;
};
S.saveUser = () => {
  const a = S.state.admin; const d = a.udlg;
  if (d.kind==='create'){
    const u = {id:'u'+Date.now(), name:d.name.trim(), email:d.email.trim(), created:iso(TODAY), pass:null}; S.state.users.push(u);
    a.udlg = null; S.flashAdmin('Usuario creado. Le enviamos un correo para que defina su contraseña', {label:'Ver correo', uid:u.id});
  } else if (d.kind==='edit'){
    const u = S.state.users.find(x=>x.id===d.uid); u.name = d.name.trim(); u.email = d.email.trim(); a.udlg = null; S.flashAdmin('Cambios publicados');
  } else if (d.kind==='delete'){
    const u = S.state.users.find(x=>x.id===d.uid); S.state.users = S.state.users.filter(x=>x.id!==d.uid); a.udlg = null; S.flashAdmin(u.name+' fue eliminado');
  }
};
S.openInvite = (uid) => { const u = S.state.users.find(x=>x.id===uid); S.setAdmin({screen:'reset', toast:null, reset:{p1:'', p2:'', who:u.name.split(' ')[0], uid, touched:false}}); };

window.SolStore = S;
})();
