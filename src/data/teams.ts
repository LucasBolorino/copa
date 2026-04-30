import type { Team, Sticker } from '../types';

// CODE1 = badge (shiny), CODE2 = squad photo, CODE3 = coaching staff, CODE4-20 = players (17)
function makeStickers(code: string, players: string[]): Sticker[] {
  const stickers: Sticker[] = [
    { id: `${code}1`, name: 'Escudo Oficial', type: 'badge', number: 1, shiny: true },
    { id: `${code}2`, name: 'Foto da Seleção', type: 'squad', number: 2 },
    { id: `${code}3`, name: 'Comissão Técnica', type: 'squad', number: 3 },
  ];
  players.forEach((name, i) => {
    stickers.push({ id: `${code}${i + 4}`, name, type: 'player', number: i + 4 });
  });
  return stickers;
}

// ── Seção INICIAL ────────────────────────────────────────────
// FWC4 e FWC8 não são brilhantes; demais são brilhantes
const INICIAL_STICKERS: Sticker[] = [
  { id: '00',   name: 'Capa do Álbum',              type: 'special', number: 0, shiny: true  },
  { id: 'FWC1', name: 'FIFA World Cup 2026',         type: 'special', number: 1, shiny: true  },
  { id: 'FWC2', name: 'Troféu FIFA',                 type: 'special', number: 2, shiny: true  },
  { id: 'FWC3', name: 'Mascote Oficial',             type: 'special', number: 3, shiny: true  },
  { id: 'FWC4', name: 'Logo Oficial',                type: 'special', number: 4, shiny: false },
  { id: 'FWC5', name: 'SoFi Stadium – Los Angeles',  type: 'special', number: 5, shiny: true  },
  { id: 'FWC6', name: 'MetLife Stadium – Nova York', type: 'special', number: 6, shiny: true  },
  { id: 'FWC7', name: 'Estadio Azteca – Cidade do México', type: 'special', number: 7, shiny: true },
  { id: 'FWC8', name: 'BC Place – Vancouver',        type: 'special', number: 8, shiny: false },
];

// ── Seção CAMPEÃS ────────────────────────────────────────────
// Todas são brilhantes
const CAMPEAS_STICKERS: Sticker[] = [
  { id: 'FWC9',  name: 'Campeãs: Uruguai 1930',    type: 'special', number: 9,  shiny: true },
  { id: 'FWC10', name: 'Campeãs: Itália 1934',      type: 'special', number: 10, shiny: true },
  { id: 'FWC11', name: 'Campeãs: Itália 1938',      type: 'special', number: 11, shiny: true },
  { id: 'FWC12', name: 'Campeãs: Uruguai 1950',     type: 'special', number: 12, shiny: true },
  { id: 'FWC13', name: 'Campeãs: Alemanha 1954',    type: 'special', number: 13, shiny: true },
  { id: 'FWC14', name: 'Campeãs: Brasil 1958',      type: 'special', number: 14, shiny: true },
  { id: 'FWC15', name: 'Campeãs: Brasil 1962',      type: 'special', number: 15, shiny: true },
  { id: 'FWC16', name: 'Campeãs: Inglaterra 1966',  type: 'special', number: 16, shiny: true },
  { id: 'FWC17', name: 'Campeãs: Brasil 1970',      type: 'special', number: 17, shiny: true },
  { id: 'FWC18', name: 'Campeãs: Argentina 2022',   type: 'special', number: 18, shiny: true },
  { id: 'FWC19', name: 'Todas as Campeãs',          type: 'special', number: 19, shiny: true },
];

// ── Seção COCA-COLA ──────────────────────────────────────────
const CC_STICKERS: Sticker[] = Array.from({ length: 14 }, (_, i) => ({
  id: `CC${i + 1}`,
  name: `Coca-Cola ${i + 1}`,
  type: 'special' as const,
  number: i + 1,
}));

export const SPECIAL_INICIAL: Team = {
  code: 'FWC_I', name: 'Introdução', flag: '🌍', confederation: 'ESPECIAL',
  color: '#1a237e', stickers: INICIAL_STICKERS,
};

export const SPECIAL_CAMPEAS: Team = {
  code: 'FWC_C', name: 'Campeãs da Copa', flag: '🏆', confederation: 'ESPECIAL',
  color: '#B8860B', stickers: CAMPEAS_STICKERS,
};

export const SPECIAL_CC: Team = {
  code: 'CC', name: 'Coca-Cola', flag: '🥤', confederation: 'ESPECIAL',
  color: '#F40009', stickers: CC_STICKERS,
};

// ── Times (ordem exata do álbum) ─────────────────────────────
export const TEAMS: Team[] = [
  // ── MEX (abre o álbum com seção própria) ──
  {
    code: 'MEX', name: 'México', flag: '🇲🇽', confederation: 'CONCACAF', color: '#006847',
    stickers: makeStickers('MEX', [
      'Guillermo Ochoa', 'Rodolfo Cota', 'Néstor Araujo', 'César Montes',
      'Jorge Sánchez', 'Gerardo Arteaga', 'Édson Álvarez', 'Andrés Guardado',
      'Hirving Lozano', 'Raúl Jiménez', 'Alexis Vega', 'Henry Martín',
      'Roberto Alvarado', 'Santiago Giménez', 'Orbelín Pineda', 'Julián Araujo', 'Uriel Antuna',
    ]),
  },
  // ── Demais seleções (ordem do álbum) ──
  {
    code: 'RSA', name: 'África do Sul', flag: '🇿🇦', confederation: 'CAF', color: '#007A4D',
    stickers: makeStickers('RSA', [
      'Ronwen Williams', 'Bruce Bvuma', 'Siyanda Xulu', 'Rushine de Reuck',
      'Reeve Frosler', 'Innocent Maela', 'Themba Zwane', 'Teboho Mokoena',
      'Percy Tau', 'Lebo Mothiba', 'Bongani Zungu', 'Lyle Foster',
      'Sipho Mbule', 'Evidence Makgopa', 'Victor Letsoalo', 'Keagan Dolly', 'Grant Margeman',
    ]),
  },
  {
    code: 'KOR', name: 'Coreia do Sul', flag: '🇰🇷', confederation: 'AFC', color: '#C60C30',
    stickers: makeStickers('KOR', [
      'Seung-gyu Kim', 'Jo Hyeon-woo', 'Kim Min-jae', 'Kim Young-gwon',
      'Kim Jin-su', 'Lee Young-jae', 'Hwang In-beom', 'Jung Woo-young',
      'Son Heung-min', 'Hwang Hee-chan', 'Lee Jae-sung', 'Kwon Chang-hoon',
      'Cho Gue-sung', 'Lee Kang-in', 'Oh Hyeon-gyu', 'Yang Hyun-jun', 'Seol Young-woo',
    ]),
  },
  {
    code: 'CZE', name: 'Tchéquia', flag: '🇨🇿', confederation: 'UEFA', color: '#D7141A',
    stickers: makeStickers('CZE', [
      'Jiří Pavlenka', 'Tomáš Vaclík', 'Tomáš Souček', 'Vladimír Coufal',
      'Patrik Schick', 'Jakub Jankto', 'Lukáš Provod', 'Marek Suchý',
      'Ondřej Duda', 'Jan Kuchta', 'Adam Hložek', 'Pavel Kadeřábek',
      'Alex Král', 'Antonín Barák', 'Matěj Jurásek', 'Lukáš Haraslín', 'David Jurásek',
    ]),
  },
  {
    code: 'CAN', name: 'Canadá', flag: '🇨🇦', confederation: 'CONCACAF', color: '#FF0000',
    stickers: makeStickers('CAN', [
      'Milan Borjan', 'Maxime Crépeau', 'Alistair Johnston', 'Kamal Miller',
      'Derek Cornelius', 'Richie Laryea', 'Alphonso Davies', 'Jonathan Osorio',
      'Atiba Hutchinson', 'Stephen Eustáquio', 'Samuel Piette', 'Ismael Koné',
      'Jonathan David', 'Cyle Larin', 'Tajon Buchanan', 'Liam Millar', 'Scott Kennedy',
    ]),
  },
  {
    code: 'BIH', name: 'Bósnia e Herzegovina', flag: '🇧🇦', confederation: 'UEFA', color: '#002395',
    stickers: makeStickers('BIH', [
      'Predrag Rajković', 'Ibrahim Šehić', 'Sead Kolašinac', 'Ognjen Vranješ',
      'Miralem Pjanić', 'Edin Džeko', 'Haris Duljevic', 'Ermedin Demirović',
      'Anel Ahmedhodžić', 'Sead Kolašinac', 'Amar Dedić', 'Deni Juric',
      'Jasmin Mujezinović', 'Stole Dimitrievski', 'Armin Hodžić', 'Benjamin Tatar', 'Kenan Kodro',
    ]),
  },
  {
    code: 'QAT', name: 'Catar', flag: '🇶🇦', confederation: 'AFC', color: '#8D1B3D',
    stickers: makeStickers('QAT', [
      'Meshaal Barsham', 'Saad Al-Sheeb', 'Bassam Al-Rawi', 'Pedro Miguel',
      'Abdelkarim Hassan', 'Homam Ahmed', 'Karim Boudiaf', 'Abdulaziz Hatem',
      'Almoez Ali', 'Akram Afif', 'Ismail Mohamad', 'Hassan Al-Haydos',
      'Assim Madibo', 'Ahmad Al-Rawi', 'Ali Assadalla', 'Khaled Al-Muftah', 'Ro-Ro',
    ]),
  },
  {
    code: 'SUI', name: 'Suíça', flag: '🇨🇭', confederation: 'UEFA', color: '#D52B1E',
    stickers: makeStickers('SUI', [
      'Yann Sommer', 'Gregor Kobel', 'Manuel Akanji', 'Nico Elvedi',
      'Ricardo Rodríguez', 'Silvan Widmer', 'Granit Xhaka', 'Remo Freuler',
      'Breel Embolo', 'Xherdan Shaqiri', 'Fabian Schär', 'Dan Ndoye',
      'Michel Aebischer', 'Ruben Vargas', 'Zeki Amdouni', 'Noah Okafor', 'Fabian Rieder',
    ]),
  },
  {
    code: 'BRA', name: 'Brasil', flag: '🇧🇷', confederation: 'CONMEBOL', color: '#009C3B',
    stickers: makeStickers('BRA', [
      'Alisson Becker', 'Ederson', 'Marquinhos', 'Éder Militão',
      'Danilo', 'Alex Sandro', 'Casemiro', 'Lucas Paquetá',
      'Rodrygo', 'Vinicius Jr.', 'Raphinha', 'Gabriel Jesus',
      'Endrick', 'Bruno Guimarães', 'Gabriel Martinelli', 'Savinho', 'Igor Jesus',
    ]),
  },
  {
    code: 'MAR', name: 'Marrocos', flag: '🇲🇦', confederation: 'CAF', color: '#C1272D',
    stickers: makeStickers('MAR', [
      'Yassine Bounou', 'Ahmed Reda Tagnaouti', 'Achraf Hakimi', 'Romain Saïss',
      'Nayef Aguerd', 'Noussair Mazraoui', 'Sofyan Amrabat', 'Azzedine Ounahi',
      'Hakim Ziyech', 'Youssef En-Nesyri', 'Abderrazak Hamdallah', 'Selim Amallah',
      'Bilal El Khannouss', 'Abde Ezzalzouli', 'Soufiane Rahimi', 'Munir El Haddadi', 'Youssef Aït Bennasser',
    ]),
  },
  {
    code: 'HAI', name: 'Haiti', flag: '🇭🇹', confederation: 'CONCACAF', color: '#00209F',
    stickers: makeStickers('HAI', [
      'Josué Duverger', 'James Léger', 'Mechack Jérôme', 'Carlens Arcus',
      'Duckens Nazon', 'Wilde-Donald Guerrier', 'Jeff Louis', 'Herve Bazile',
      'Frantzdy Pierrot', 'Derrick Etienne', 'Kévin Lafrance', 'Jonathan Isoné',
      'Steeven Saba', 'Naby Sarr', 'Jean-Éric Ramirez', 'Abel Zanon', 'Nicolas Janvier',
    ]),
  },
  {
    code: 'SCO', name: 'Escócia', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', confederation: 'UEFA', color: '#003F87',
    stickers: makeStickers('SCO', [
      'Angus Gunn', 'Craig Gordon', 'Andrew Robertson', 'John Souttar',
      'Scott McKenna', 'Kieran Tierney', 'Scott McTominay', 'Callum McGregor',
      'Che Adams', 'Ryan Christie', 'Stuart Armstrong', 'Billy Gilmour',
      'Lawrence Shankland', 'Ryan Porteous', 'Kenny McLean', 'Greg Taylor', 'Liam Cooper',
    ]),
  },
  {
    code: 'USA', name: 'Estados Unidos', flag: '🇺🇸', confederation: 'CONCACAF', color: '#002868',
    stickers: makeStickers('USA', [
      'Matt Turner', 'Zack Steffen', 'Miles Robinson', 'Walker Zimmerman',
      'Sergiño Dest', 'Antonee Robinson', 'Tyler Adams', 'Weston McKennie',
      'Christian Pulisic', 'Gio Reyna', 'Josh Sargent', 'Ricardo Pepi',
      'Timothy Weah', 'Yunus Musah', 'Brendan Aaronson', 'Folarin Balogun', 'Jordan Morris',
    ]),
  },
  {
    code: 'PAR', name: 'Paraguai', flag: '🇵🇾', confederation: 'CONMEBOL', color: '#D52B1E',
    stickers: makeStickers('PAR', [
      'Antony Silva', 'Alfredo Aguilar', 'Gustavo Gómez', 'Omar Alderete',
      'Junior Alonso', 'Fabián Balbuena', 'Richard Sánchez', 'Gastón Giménez',
      'Ángel Romero', 'Roque Santa Cruz', 'Hernán Pérez', 'Derlis González',
      'Miguel Almirón', 'Robert Morales', 'Julio Enciso', 'Alejandro Romero Gamarra', 'Diego Gómez',
    ]),
  },
  {
    code: 'AUS', name: 'Austrália', flag: '🇦🇺', confederation: 'AFC', color: '#FFD700',
    stickers: makeStickers('AUS', [
      'Mat Ryan', 'Danny Vukovic', 'Harry Souttar', 'Trent Sainsbury',
      'Nathaniel Atkinson', 'Aziz Behich', 'Aaron Mooy', 'Jackson Irvine',
      'Mathew Leckie', 'Mitchell Duke', 'Craig Goodwin', 'Martin Boyle',
      'Marco Tilio', 'Riley McGree', 'Nestory Irankunda', 'Cameron Devlin', 'Keanu Baccus',
    ]),
  },
  {
    code: 'TUR', name: 'Turquia', flag: '🇹🇷', confederation: 'UEFA', color: '#E30A17',
    stickers: makeStickers('TUR', [
      'Mert Günok', 'Uğurcan Çakır', 'Çağlar Söyüncü', 'Merih Demiral',
      'Zeki Çelik', 'Ferdi Kadıoğlu', 'Hakan Çalhanoğlu', 'Orkun Kökçü',
      'Burak Yılmaz', 'Cenk Tosun', 'Kerem Aktürkoğlu', 'Yusuf Yazıcı',
      'Arda Güler', 'Baris Alper Yilmaz', 'Samet Akaydin', 'Ismail Yuksek', 'Okay Yokuslu',
    ]),
  },
  {
    code: 'GER', name: 'Alemanha', flag: '🇩🇪', confederation: 'UEFA', color: '#000000',
    stickers: makeStickers('GER', [
      'Manuel Neuer', 'Marc-André ter Stegen', 'Niklas Süle', 'Antonio Rüdiger',
      'Joshua Kimmich', 'David Raum', 'Toni Kroos', 'Ilkay Gündogan',
      'Thomas Müller', 'Kai Havertz', 'Leroy Sané', 'Serge Gnabry',
      'Jamal Musiala', 'Florian Wirtz', 'Niclas Füllkrug', 'Julian Brandt', 'Robert Andrich',
    ]),
  },
  {
    code: 'CUW', name: 'Curaçao', flag: '🇨🇼', confederation: 'CONCACAF', color: '#003DA5',
    stickers: makeStickers('CUW', [
      'Eloy Room', 'Cuco Martina', 'Leandro Bacuna', 'Darryl Lachman',
      'Jurich Carolina', 'Rangelo Janga', 'Gevaro Nepomuceno', 'Quiñcy Promes',
      'Ryan Donk', 'Jarchinio Antonia', 'Cédric van der Gun', 'Gilson Tavares',
      'Jeffrey Fortes', 'Brandley Kuwas', 'Myron Boadu', 'Sheraldo Becker', 'Sifou Baio',
    ]),
  },
  {
    code: 'CIV', name: 'Costa do Marfim', flag: '🇨🇮', confederation: 'CAF', color: '#F77F00',
    stickers: makeStickers('CIV', [
      'Badra Ali Sangaré', 'Sylvain Gbohouo', 'Eric Bailly', 'Wilfried Kanon',
      'Serge Aurier', 'Ghislain Konan', 'Jean Michaël Seri', 'Franck Kessié',
      'Sébastien Haller', 'Nicolas Pépé', 'Wilfried Zaha', 'Simon Adingra',
      'Salomon Kalou', 'Maxwel Cornet', 'Odilon Kossounou', 'Christian Kouamé', 'Oumar Diakité',
    ]),
  },
  {
    code: 'ECU', name: 'Equador', flag: '🇪🇨', confederation: 'CONMEBOL', color: '#FFD100',
    stickers: makeStickers('ECU', [
      'Hernán Galíndez', 'Byron Castillo', 'Piero Hincapié', 'Félix Torres',
      'Enner Valencia', 'Moisés Caicedo', 'Jeremy Sarmiento', 'Gonzalo Plata',
      'Michael Estrada', 'Ángel Mena', 'Pervis Estupiñán', 'Jhegson Méndez',
      'Romario Ibarra', 'Djorkaeff Reasco', 'Kendry Páez', 'Kevin Rodríguez', 'Ayrton Preciado',
    ]),
  },
  {
    code: 'NED', name: 'Países Baixos', flag: '🇳🇱', confederation: 'UEFA', color: '#FF6600',
    stickers: makeStickers('NED', [
      'Bart Verbruggen', 'Andries Noppert', 'Virgil van Dijk', 'Stefan de Vrij',
      'Denzel Dumfries', 'Nathan Aké', 'Frenkie de Jong', 'Tijjani Reijnders',
      'Memphis Depay', 'Cody Gakpo', 'Steven Bergwijn', 'Wout Weghorst',
      'Teun Koopmeiners', 'Donyell Malen', 'Joey Veerman', 'Lutsharel Geertruida', 'Jeremie Frimpong',
    ]),
  },
  {
    code: 'JPN', name: 'Japão', flag: '🇯🇵', confederation: 'AFC', color: '#BC002D',
    stickers: makeStickers('JPN', [
      'Shuichi Gonda', 'Zion Suzuki', 'Maya Yoshida', 'Shogo Taniguchi',
      'Hiroki Sakai', 'Yuto Nagatomo', 'Gaku Shibasaki', 'Wataru Endo',
      'Takumi Minamino', 'Daichi Kamada', 'Kaoru Mitoma', 'Ritsu Doan',
      'Junya Ito', 'Hidemasa Morita', 'Takefusa Kubo', 'Ayase Ueda', 'Ao Tanaka',
    ]),
  },
  {
    code: 'SWE', name: 'Suécia', flag: '🇸🇪', confederation: 'UEFA', color: '#006AA7',
    stickers: makeStickers('SWE', [
      'Robin Olsen', 'Karl-Johan Johnsson', 'Victor Lindelöf', 'Pontus Jansson',
      'Ludwig Augustinsson', 'Mikael Lustig', 'Albin Ekdal', 'Sebastian Larsson',
      'Dejan Kulusevski', 'Alexander Isak', 'Emil Forsberg', 'Viktor Claesson',
      'Anthony Elanga', 'Zlatan Ibrahimović', 'Mattias Svanberg', 'Jesper Karlsson', 'Isak Hien',
    ]),
  },
  {
    code: 'TUN', name: 'Tunísia', flag: '🇹🇳', confederation: 'CAF', color: '#E70013',
    stickers: makeStickers('TUN', [
      'Aymen Dahmen', 'Farouk Ben Mustapha', 'Dylan Bronn', 'Yassine Meriah',
      'Mohamed Drager', 'Ali Maaloul', 'Ellyes Skhiri', 'Anis Badri',
      'Wahbi Khazri', 'Youssef Msakni', 'Seifeddine Jaziri', 'Hannibal Mejbri',
      'Naim Sliti', 'Issam Jebali', 'Taha Yassine Khenissi', 'Akoua Rafia', 'Mohamed Ali Ben Romdhane',
    ]),
  },
  {
    code: 'BEL', name: 'Bélgica', flag: '🇧🇪', confederation: 'UEFA', color: '#EF3340',
    stickers: makeStickers('BEL', [
      'Thibaut Courtois', 'Koen Casteels', 'Jan Vertonghen', 'Toby Alderweireld',
      'Thomas Meunier', 'Yannick Carrasco', 'Kevin De Bruyne', 'Axel Witsel',
      'Romelu Lukaku', 'Dries Mertens', 'Leandro Trossard', 'Lois Openda',
      'Charles De Ketelaere', 'Amadou Onana', 'Arthur Theate', 'Jeremy Doku', 'Julien Duranville',
    ]),
  },
  {
    code: 'EGY', name: 'Egito', flag: '🇪🇬', confederation: 'CAF', color: '#C8102E',
    stickers: makeStickers('EGY', [
      'Mohamed El-Shenawy', 'Ahmed El-Shenawy', 'Ahmed Hegazi', 'Mohamed Abdelmonem',
      'Omar Kamal', 'Akram Tawfik', 'Mohamed Elneny', 'Tarek Hamed',
      'Mohamed Salah', 'Mostafa Mohamed', 'Omar Marmoush', 'Mahmoud Hassan',
      'Trézéguet', 'Amr El-Sulaya', 'Ahmed Sayed Zizo', 'Marwan Hamdy', 'Mohamed Attia',
    ]),
  },
  {
    code: 'IRN', name: 'Irã', flag: '🇮🇷', confederation: 'AFC', color: '#239F40',
    stickers: makeStickers('IRN', [
      'Alireza Beiranvand', 'Hossein Hosseini', 'Morteza Pouraliganji', 'Majid Hosseini',
      'Sadegh Moharrami', 'Milad Mohammadi', 'Saeid Ezatolahi', 'Ali Gholizadeh',
      'Sardar Azmoun', 'Mehdi Taremi', 'Alireza Jahanbakhsh', 'Vahid Amiri',
      'Ramin Rezaeian', 'Karim Ansarifard', 'Allahyar Sayyadmanesh', 'Ahmad Noorollahi', 'Ehsan Hajsafi',
    ]),
  },
  {
    code: 'NZL', name: 'Nova Zelândia', flag: '🇳🇿', confederation: 'OFC', color: '#00247D',
    stickers: makeStickers('NZL', [
      'Stefan Marinovic', 'Michael Woud', 'Tommy Smith', 'Winston Reid',
      'Liberato Cacace', 'Tim Payne', 'Michael McGlinchey', 'Liam McGing',
      'Chris Wood', 'Kosta Barbarouses', 'Sarpreet Singh', 'Matthew Ridenton',
      'Elijah Just', 'Ben Waine', 'Marco Rojas', 'Callan Elliot', 'Ryan Thomas',
    ]),
  },
  {
    code: 'ESP', name: 'Espanha', flag: '🇪🇸', confederation: 'UEFA', color: '#AA151B',
    stickers: makeStickers('ESP', [
      'Unai Simón', 'David Raya', 'Aymeric Laporte', 'Robin Le Normand',
      'Dani Carvajal', 'Marc Cucurella', 'Rodri', 'Pedri',
      'Álvaro Morata', 'Ferran Torres', 'Dani Olmo', 'Nico Williams',
      'Lamine Yamal', 'Gavi', 'Fabian Ruiz', 'Mikel Merino', 'Marcos Llorente',
    ]),
  },
  {
    code: 'CPV', name: 'Cabo Verde', flag: '🇨🇻', confederation: 'CAF', color: '#003893',
    stickers: makeStickers('CPV', [
      'Vozinha', 'Koffi Djidji', 'Marco Soares', 'Stopira',
      'Dylan Tavares', 'Lisandro Semedo', 'Ryan Mendes', 'Garry Rodrigues',
      'Júnior Djaló', 'Djaniny Tavares', 'Nanu', 'Steven Fortes',
      'Kenny Rocha', 'Jamiro Monteiro', 'Hélio Varela', 'Willy Semedo', 'Elvis Macedo',
    ]),
  },
  {
    code: 'KSA', name: 'Arábia Saudita', flag: '🇸🇦', confederation: 'AFC', color: '#006C35',
    stickers: makeStickers('KSA', [
      'Mohammed Al-Owais', 'Yasser Al-Mosailem', 'Ali Al-Bulaihi', 'Abdulelah Al-Amri',
      'Saud Abdulhamid', 'Yasser Al-Shahrani', 'Abdullah Otayf', 'Salman Al-Faraj',
      'Saleh Al-Shehri', 'Firas Al-Buraikan', 'Salem Al-Dawsari', 'Mohammed Al-Burayk',
      'Mohammed Kanno', 'Hattan Bahebri', 'Ali Lajami', 'Riyadh Sharahili', 'Nasser Al-Dawsari',
    ]),
  },
  {
    code: 'URU', name: 'Uruguai', flag: '🇺🇾', confederation: 'CONMEBOL', color: '#5EB6E4',
    stickers: makeStickers('URU', [
      'Sergio Rochet', 'Ronald Araújo', 'José María Giménez', 'Mathías Olivera',
      'Federico Valverde', 'Rodrigo Bentancur', 'Manuel Ugarte', 'Darwin Núñez',
      'Luis Suárez', 'Edinson Cavani', 'Facundo Pellistri', 'Maxi Gómez',
      'Sebastián Coates', 'Giorgian De Arrascaeta', 'Agustín Canobbio', 'Brian Rodríguez', 'Matías Viña',
    ]),
  },
  {
    code: 'FRA', name: 'França', flag: '🇫🇷', confederation: 'UEFA', color: '#002395',
    stickers: makeStickers('FRA', [
      'Mike Maignan', 'Hugo Lloris', 'Raphaël Varane', 'Dayot Upamecano',
      'William Saliba', 'Theo Hernández', 'N\'Golo Kanté', 'Aurélien Tchouaméni',
      'Kylian Mbappé', 'Antoine Griezmann', 'Ousmane Dembélé', 'Marcus Thuram',
      'Randal Kolo Muani', 'Eduardo Camavinga', 'Kingsley Coman', 'Christopher Nkunku', 'Adrien Rabiot',
    ]),
  },
  {
    code: 'SEN', name: 'Senegal', flag: '🇸🇳', confederation: 'CAF', color: '#00853F',
    stickers: makeStickers('SEN', [
      'Édouard Mendy', 'Alfred Gomis', 'Kalidou Koulibaly', 'Abdou Diallo',
      'Youssouf Sabaly', 'Saliou Ciss', 'Idrissa Gueye', 'Nampalys Mendy',
      'Sadio Mané', 'Cheikhou Kouyaté', 'Ismaila Sarr', 'Boulaye Dia',
      'Krepin Diatta', 'Pape Matar Sarr', 'Nicolas Jackson', 'Lamine Camara', 'Pathé Ciss',
    ]),
  },
  {
    code: 'IRQ', name: 'Iraque', flag: '🇮🇶', confederation: 'AFC', color: '#007A3D',
    stickers: makeStickers('IRQ', [
      'Jalal Hassan', 'Mohamed Hameed', 'Ali Adnan', 'Alaa Abbas',
      'Saman Shaker', 'Mustafa Nadhim', 'Amjed Attwan', 'Osama Rashid',
      'Mohanad Ali', 'Aymen Hussein', 'Hammadi Ahmed', 'Bashar Resan',
      'Ahmed Ibrahim', 'Ibrahim Bayesh', 'Safaa Hadi', 'Hasan Abdulkareem', 'Saad Natiq',
    ]),
  },
  {
    code: 'NOR', name: 'Noruega', flag: '🇳🇴', confederation: 'UEFA', color: '#EF2B2D',
    stickers: makeStickers('NOR', [
      'Ørjan Nyland', 'Rune Jarstein', 'Leo Skiri Østigård', 'Andreas Hanche-Olsen',
      'Omar Elabdellaoui', 'Birger Meling', 'Martin Ødegaard', 'Sander Berge',
      'Erling Haaland', 'Alexander Sørloth', 'Mohamed Elyounoussi', 'Ola Solbakken',
      'Antonio Nusa', 'Kristian Thorstvedt', 'Fredrik Aursnes', 'Håkon Evjen', 'Jens Petter Hauge',
    ]),
  },
  {
    code: 'ARG', name: 'Argentina', flag: '🇦🇷', confederation: 'CONMEBOL', color: '#74ACDF',
    stickers: makeStickers('ARG', [
      'Lionel Messi', 'Emiliano Martínez', 'Rodrigo De Paul', 'Enzo Fernández',
      'Julián Álvarez', 'Lautaro Martínez', 'Nicolás Otamendi', 'Lisandro Martínez',
      'Nahuel Molina', 'Marcos Acuña', 'Alexis Mac Allister', 'Paulo Dybala',
      'Ángel Di María', 'Thiago Almada', 'Valentín Castellanos', 'Giovanni Simeone', 'Germán Pezzella',
    ]),
  },
  {
    code: 'ALG', name: 'Argélia', flag: '🇩🇿', confederation: 'CAF', color: '#006233',
    stickers: makeStickers('ALG', [
      'Raïs M\'Bolhi', 'Alexandre Oukidja', 'Ramy Bensebaïni', 'Djamel Benlamri',
      'Aïssa Mandi', 'Youcef Atal', 'Sofiane Feghouli', 'Nabil Bentaleb',
      'Islam Slimani', 'Baghdad Bounedjah', 'Yacine Brahimi', 'Andy Delort',
      'Houssem Aouar', 'Mohamed Amine Amoura', 'Ilyes Chetti', 'Amir Sayoud', 'Riyad Mahrez',
    ]),
  },
  {
    code: 'AUT', name: 'Áustria', flag: '🇦🇹', confederation: 'UEFA', color: '#ED2939',
    stickers: makeStickers('AUT', [
      'Patrick Pentz', 'Heinz Lindner', 'David Alaba', 'Aleksandar Dragović',
      'Stefan Lainer', 'Philipp Mwene', 'Florian Grillitsch', 'Christoph Baumgartner',
      'Marko Arnautović', 'Michael Gregoritsch', 'Marcel Sabitzer', 'Konrad Laimer',
      'Nicolas Seiwald', 'Patrick Wimmer', 'Florian Kainz', 'Maximilian Wöber', 'Romano Schmid',
    ]),
  },
  {
    code: 'JOR', name: 'Jordânia', flag: '🇯🇴', confederation: 'AFC', color: '#007A3D',
    stickers: makeStickers('JOR', [
      'Yazeed Abulaila', 'Ahmad Nassar', 'Yazan Al-Naimat', 'Ehsan Haddad',
      'Ahmad Al-Sarairah', 'Mahmoud Al-Mardi', 'Musa Al-Tamari', 'Yasser Arikat',
      'Hamza Al-Dardour', 'Mahdi Abu Rashid', 'Hassan Abdel-Fattah', 'Khaled Al-Audain',
      'Omar Al-Dardour', 'Faris Hasan', 'Baha Faisal', 'Ahmad Hadhran', 'Ahmad Srour',
    ]),
  },
  {
    code: 'POR', name: 'Portugal', flag: '🇵🇹', confederation: 'UEFA', color: '#006600',
    stickers: makeStickers('POR', [
      'Rui Patrício', 'Diogo Costa', 'Pepe', 'Rúben Dias',
      'João Cancelo', 'Nuno Mendes', 'Bernardo Silva', 'João Palhinha',
      'Cristiano Ronaldo', 'Bruno Fernandes', 'Rafael Leão', 'Diogo Jota',
      'Gonçalo Ramos', 'Vitinha', 'Matheus Nunes', 'Pedro Neto', 'Rúben Neves',
    ]),
  },
  {
    code: 'COD', name: 'Rep. Dem. Congo', flag: '🇨🇩', confederation: 'CAF', color: '#007A5E',
    stickers: makeStickers('COD', [
      'Joël Kiassumbua', 'Ley Matampi', 'Chancel Mbemba', 'Marcel Tisserand',
      'Yannick Bolasie', 'Cédric Bakambu', 'Neeskens Kebano', 'Arthur Masuaku',
      'Dieumerci Mbokani', 'Britt Assombalonga', 'Fodé Fofana', 'Sammy Okunaka',
      'Jonathan Bolingi', 'Gaël Kakuta', 'Ben Malango', 'Théo Bongonda', 'Paul-José M\'Poku',
    ]),
  },
  {
    code: 'UZB', name: 'Uzbequistão', flag: '🇺🇿', confederation: 'AFC', color: '#1EB53A',
    stickers: makeStickers('UZB', [
      'Otabek Shukurov', 'Eldor Shomurodov', 'Jasur Yakhshiboev', 'Sanjar Tursunov',
      'Sherzod Nishonov', 'Dostonbek Khamdamov', 'Bobir Abdixoliqov', 'Abbosbek Fayzullaev',
      'Shamsiddin Fayzullayev', 'Jaloliddin Masharipov', 'Otabek Jalolov', 'Akbar Raupov',
      'Khojiakbar Alijonov', 'Husan Hoshimov', 'Oybek Barnoev', 'Nodir Tursunov', 'Ulugbek Askarov',
    ]),
  },
  {
    code: 'COL', name: 'Colômbia', flag: '🇨🇴', confederation: 'CONMEBOL', color: '#FCD116',
    stickers: makeStickers('COL', [
      'David Ospina', 'James Rodríguez', 'Luis Díaz', 'Juan Cuadrado',
      'Yerry Mina', 'Davinson Sánchez', 'Jhon Córdoba', 'Duván Zapata',
      'Miguel Ángel Borja', 'Jefferson Lerma', 'Matheus Uribe', 'Daniel Muñoz',
      'Carlos Cuesta', 'Cucho Hernández', 'Rafael Santos Borré', 'Óscar Cortés', 'Richard Ríos',
    ]),
  },
  {
    code: 'ENG', name: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', confederation: 'UEFA', color: '#CF091D',
    stickers: makeStickers('ENG', [
      'Jordan Pickford', 'Aaron Ramsdale', 'Harry Maguire', 'John Stones',
      'Kyle Walker', 'Luke Shaw', 'Declan Rice', 'Jude Bellingham',
      'Harry Kane', 'Bukayo Saka', 'Phil Foden', 'Marcus Rashford',
      'Raheem Sterling', 'Trent Alexander-Arnold', 'Conor Gallagher', 'Cole Palmer', 'Jack Grealish',
    ]),
  },
  {
    code: 'CRO', name: 'Croácia', flag: '🇭🇷', confederation: 'UEFA', color: '#FF0000',
    stickers: makeStickers('CRO', [
      'Dominik Livaković', 'Luka Modrić', 'Ivan Perišić', 'Marcelo Brozović',
      'Mateo Kovačić', 'Dejan Lovren', 'Joško Gvardiol', 'Ivan Rakitić',
      'Andrej Kramarić', 'Bruno Petković', 'Nikola Vlašić', 'Mario Pašalić',
      'Borna Sosa', 'Martin Erlić', 'Josip Šutalo', 'Luka Sučić', 'Marko Pjaca',
    ]),
  },
  {
    code: 'GHA', name: 'Gana', flag: '🇬🇭', confederation: 'CAF', color: '#006B3F',
    stickers: makeStickers('GHA', [
      'Lawrence Ati-Zigi', 'Richard Ofori', 'Daniel Amartey', 'Alexander Djiku',
      'Tariq Lamptey', 'Baba Rahman', 'Thomas Partey', 'Mohammed Kudus',
      'André Ayew', 'Jordan Ayew', 'Inaki Williams', 'Antoine Semenyo',
      'Osman Bukari', 'Ernest Nuamah', 'Kamaldeen Sulemana', 'Joel Fameyeh', 'Ransford-Yeboah Königsdörffer',
    ]),
  },
  {
    code: 'PAN', name: 'Panamá', flag: '🇵🇦', confederation: 'CONCACAF', color: '#DA121A',
    stickers: makeStickers('PAN', [
      'Luis Mejía', 'Édgar Barcenas', 'Fidel Escobar', 'Harold Cummings',
      'Eric Davis', 'Andrés Andrade', 'Adalberto Carrasquilla', 'Aníbal Godoy',
      'Gabriel Torres', 'Rolando Blackburn', 'José Fajardo', 'Cecilio Waterman',
      'Alberto Quintero', 'Jovani Welch', 'Michael Murillo', 'Tomás Olivo', 'Adalberto Carrasquilla',
    ]),
  },
];

// Ordem exata do álbum: Intro → Times → Campeãs → Coca-Cola
export const ALL_TEAMS: Team[] = [
  SPECIAL_INICIAL,
  ...TEAMS,
  SPECIAL_CAMPEAS,
  SPECIAL_CC,
];

export const CONFEDERATIONS = [
  'ESPECIAL',
  'CONMEBOL',
  'UEFA',
  'CONCACAF',
  'CAF',
  'AFC',
  'OFC',
] as const;

export const CONFEDERATION_LABELS: Record<string, string> = {
  ESPECIAL: 'Especiais',
  CONMEBOL: 'América do Sul',
  UEFA: 'Europa',
  CONCACAF: 'Am. Norte/Central',
  CAF: 'África',
  AFC: 'Ásia',
  OFC: 'Oceania',
};

export const TOTAL_STICKERS = ALL_TEAMS.reduce((sum, t) => sum + t.stickers.length, 0);
