/* "Where we go" route map for armina-signature.travel.
 *
 * Mounted by the page's DC logic (componentDidMount → mountRouteMap):
 *   window.ArminaRouteMap.mount(el, { lang, tours, packages, wa, openTour, openPackage })
 * Tour and package titles come from the page, so they stay in sync with the site copy.
 * Stops, coordinates and place texts live here. A tour whose slot is not in TOUR_STOPS
 * is left off the map until its stops are added below.
 *
 * Map outline and Lake Sevan: Natural Earth (public domain).
 */
(function () {
  "use strict";

  /* Switches for the optional features. Drive times and seasons are estimates
     waiting for confirmation, so they start off. */
  var OPT = { filters: false, packages: true, planner: true, times: false, ararat: true, seasons: false, regions: true };

  var NS = "http://www.w3.org/2000/svg";
  var GEO = { lon0: 43.3, lat1: 41.42, kx: 0.7649214009184319, k: 373.52110343785915,
    armenia: "M486.4,48.4L497.0,70.5L494.1,78.4L495.7,83.0L500.6,85.1L519.2,85.1L524.1,86.7L539.1,98.3L542.8,103.6L543.2,109.5L533.4,116.6L505.1,115.4L502.1,127.5L505.7,133.7L511.9,137.8L517.4,138.4L519.2,133.9L520.0,127.1L524.7,129.7L534.1,139.3L539.9,142.9L549.0,151.5L562.5,153.0L575.0,158.1L581.5,159.2L597.6,151.3L605.5,150.4L607.2,159.2L604.7,171.3L608.2,175.1L615.1,176.9L622.6,183.1L639.4,203.2L645.2,205.1L651.9,205.6L656.9,208.2L657.4,216.4L652.1,231.8L644.5,240.3L610.8,256.5L599.7,265.6L592.5,278.2L592.4,294.1L596.5,302.7L607.8,312.7L612.8,318.9L615.8,334.8L618.5,337.8L624.4,341.7L636.1,365.7L653.0,381.5L719.5,419.2L731.9,432.8L737.6,433.1L743.6,431.4L749.9,431.0L754.1,433.2L758.2,437.2L765.5,446.9L766.0,453.5L760.8,477.5L757.4,486.6L751.9,494.0L745.6,499.5L741.2,519.5L739.2,523.5L735.4,526.8L715.4,528.7L668.4,520.9L650.4,532.7L651.3,541.5L660.3,545.7L690.1,548.7L697.9,552.6L704.1,559.5L719.1,590.5L732.0,603.4L747.5,611.4L765.5,616.9L773.3,624.6L784.3,647.1L793.3,654.4L804.1,657.5L809.1,660.3L813.2,665.4L819.9,678.3L824.1,682.3L830.4,684.3L840.3,682.2L859.9,672.1L869.6,672.9L873.7,676.2L880.4,685.4L884.7,688.5L890.3,689.5L908.4,687.8L913.0,688.8L917.7,691.9L921.2,696.8L922.1,702.9L919.5,707.7L912.0,713.4L911.9,719.5L913.9,723.5L913.8,727.0L911.8,729.7L908.4,731.4L887.3,735.4L878.3,741.1L874.5,750.7L878.5,762.4L887.8,769.8L908.4,779.1L912.9,782.9L916.6,794.3L919.3,799.8L926.2,807.2L940.3,817.6L943.6,823.4L941.1,824.7L935.1,824.9L921.8,834.5L918.3,835.0L901.0,826.1L891.0,824.8L884.4,831.0L884.6,842.5L892.0,849.9L901.5,855.4L908.4,861.1L912.0,873.3L913.6,883.9L912.7,894.4L907.4,913.0L907.2,922.2L908.4,926.6L918.3,947.9L913.2,946.5L883.4,932.9L879.5,932.0L869.5,934.7L854.7,936.1L849.1,938.8L834.3,949.8L829.3,952.3L810.2,954.8L793.6,922.4L778.7,880.1L772.9,868.3L759.5,847.3L756.9,837.5L758.6,828.0L767.4,816.3L768.0,813.6L767.4,810.7L759.7,802.2L739.2,792.0L721.1,775.8L704.9,771.5L702.5,765.9L704.3,758.4L713.9,742.4L715.2,736.5L712.6,719.5L713.5,703.6L710.9,698.9L704.4,694.2L696.5,691.1L689.9,691.2L653.3,700.2L645.6,703.4L622.6,718.2L616.4,721.2L610.0,721.3L606.9,719.5L597.8,710.1L592.8,707.5L579.3,706.2L575.1,704.5L572.3,700.3L568.9,692.6L560.0,679.9L552.3,682.5L544.2,690.1L533.7,692.7L528.1,689.0L527.0,683.6L529.8,670.2L530.3,661.4L529.0,654.5L526.1,648.3L505.0,621.1L495.3,616.2L484.6,619.9L474.0,628.1L464.9,633.2L455.2,635.6L442.7,635.4L429.4,637.8L421.3,641.4L416.9,633.8L397.7,607.7L395.0,606.1L390.3,606.5L385.1,603.2L374.7,591.2L370.9,593.5L369.8,591.4L368.9,583.5L362.1,577.8L359.7,568.9L356.5,563.5L349.2,555.2L332.7,540.8L293.0,517.5L282.6,514.2L272.9,514.2L255.7,518.9L238.7,522.1L236.3,521.3L232.7,517.7L229.8,517.0L223.8,518.6L213.8,525.6L209.3,527.2L174.9,521.3L143.7,504.0L117.5,496.5L104.4,489.3L100.7,478.5L104.7,474.8L117.6,472.0L120.4,467.1L118.6,462.9L109.6,451.9L106.6,445.3L111.8,441.3L107.4,431.1L94.7,414.5L87.0,407.2L84.1,401.4L86.0,395.2L88.4,391.1L93.0,376.0L93.0,373.5L81.4,363.6L75.3,356.8L74.1,351.9L83.9,340.3L90.1,336.0L96.8,335.2L94.7,329.9L100.7,332.7L100.4,323.7L104.2,316.0L116.3,301.8L114.2,293.4L121.8,280.5L122.7,277.5L120.2,245.4L117.5,238.4L105.6,219.6L102.7,212.2L99.3,189.0L96.1,181.7L87.1,170.6L75.8,161.3L63.5,155.2L51.3,153.5L45.9,148.3L41.3,137.7L38.9,125.8L40.1,117.1L45.8,117.8L64.0,111.0L76.2,110.5L122.8,117.0L129.8,116.4L135.4,114.1L148.7,102.5L160.9,97.5L187.4,96.9L200.3,93.8L211.8,88.7L217.5,88.1L229.6,91.5L235.6,90.4L241.2,87.4L245.7,83.0L248.1,73.4L251.5,71.0L254.6,71.0L262.3,74.1L276.1,83.6L281.4,85.6L288.1,84.5L295.2,78.3L298.5,77.2L302.1,77.6L317.3,86.8L323.6,89.0L330.0,89.5L336.9,87.5L344.5,79.7L347.6,79.6L351.7,89.1L357.6,90.8L361.8,87.1L369.0,76.3L375.1,73.5L380.9,74.3L392.8,79.0L434.7,79.9L442.2,78.8L445.1,74.9L442.0,70.7L431.3,65.6L428.9,60.3L434.5,54.8L462.1,59.1L472.9,58.8ZM632.5,305.6L622.6,302.6L620.9,299.0L621.0,291.2L622.6,287.5L626.2,285.0L630.2,283.8L638.5,284.3L645.9,288.5L642.0,298.2Z", sevan: "M496.8,345.0L491.0,345.1L483.9,344.1L477.7,341.0L474.4,336.3L476.2,329.8L480.8,326.6L486.1,324.8L489.3,321.9L487.1,315.9L479.3,309.8L478.3,305.5L478.5,300.6L479.5,297.4L481.8,296.1L486.1,296.8L508.0,305.5L511.7,305.5L514.3,309.9L549.1,331.1L556.3,339.8L564.7,347.5L570.5,351.4L570.4,358.1L572.3,359.5L580.1,360.8L584.7,363.2L585.9,363.1L588.5,358.8L587.1,358.1L585.9,355.8L586.2,351.3L588.0,347.9L601.7,355.5L611.3,365.4L626.0,386.3L636.9,394.0L648.6,398.2L652.5,401.4L671.2,427.7L674.7,436.0L676.1,446.5L674.7,455.3L671.0,462.2L665.7,466.6L659.4,468.1L646.6,466.3L631.0,475.8L619.5,469.3L612.6,468.4L606.7,471.9L601.2,476.4L594.4,478.4L580.1,478.4L567.4,475.3L558.3,467.7L552.4,455.8L548.8,440.1L550.9,409.4L550.4,391.5L544.9,381.1L542.4,381.3L536.2,385.2L533.1,386.1L525.9,381.8L522.4,381.1L521.4,379.2L521.4,367.0L520.4,362.5L518.0,361.4L511.7,360.8Z" };
  var THUMB = "/assets/photos/thumbs/";

  function xy(lat, lon) { return { x: (lon - GEO.lon0) * GEO.kx * GEO.k, y: (GEO.lat1 - lat) * GEO.k }; }

  /* ── places ── (Azat Reservoir, Mount Dimats and the Stepanavan area are approximate) */
  var PLACES = {
    yerevan: { lat: 40.1776, lon: 44.5126, photo: "tour-yerevan",
      en: ["Yerevan", "Where every tour starts: markets, Republic Square and the Cascade."],
      ru: ["Ереван", "Отсюда начинается каждый тур: рынки, площадь Республики и Каскад."] },
    echmiadzin: { lat: 40.1620, lon: 44.2960, photo: "tour-echmiadzin", time: "30 min",
      en: ["Echmiadzin & Zvartnots", "The Mother See of the Armenian Church and the ruins of Zvartnots Cathedral."],
      ru: ["Эчмиадзин и Звартноц", "Первопрестольный собор Армянской церкви и руины храма Звартноц."] },
    charents: { lat: 40.0870, lon: 44.6420, photo: "tour-garni-2", time: "30 min", ararat: true,
      en: ["Charents' Arch", "A stone arch that frames the best roadside view of Mount Ararat."],
      ru: ["Арка Чаренца", "Каменная арка, из которой открывается лучший вид на Арарат с дороги."] },
    garni: { lat: 40.1123, lon: 44.7303, photo: "tour-garni", time: "45 min",
      en: ["Garni & Symphony of Stones", "Armenia's only standing Greco-Roman temple, above a gorge of basalt columns."],
      ru: ["Гарни и Симфония камней", "Единственный сохранившийся в Армении греко-римский храм над ущельем базальтовых колонн."] },
    geghard: { lat: 40.1403, lon: 44.8183, photo: "tour-geghard", time: "1 h",
      en: ["Geghard Monastery", "A UNESCO monastery carved partly into the cliff."],
      ru: ["Монастырь Гегард", "Монастырь из списка ЮНЕСКО, частично высеченный в скале."] },
    azat: { lat: 39.9750, lon: 44.6250, photo: "tour-azat", time: "50 min",
      en: ["Azat Reservoir", "A viewpoint over the reservoir, reached by ATV from Garni."],
      ru: ["Азатское водохранилище", "Смотровая площадка над водохранилищем, куда едут на квадроциклах из Гарни."] },
    khorvirap: { lat: 39.8783, lon: 44.5761, photo: "tour-khorvirap", time: "50 min", ararat: true,
      en: ["Khor Virap", "The monastery closest to Mount Ararat."],
      ru: ["Хор Вирап", "Ближайший к Арарату монастырь."] },
    areni: { lat: 39.7250, lon: 45.1900, photo: "tour-khorvirap-2", time: "1 h 45",
      en: ["Areni & Areni-1 Cave", "Wine village and the cave where the world's oldest known winery was found."],
      ru: ["Арени и пещера Арени-1", "Винодельческое село и пещера, где нашли древнейшую известную винодельню."] },
    noravank: { lat: 39.6844, lon: 45.2328, photo: "tour-khorvirap-3", time: "2 h",
      en: ["Noravank", "A monastery among red cliffs in a narrow gorge."],
      ru: ["Нораванк", "Монастырь среди красных скал в узком ущелье."] },
    jermuk: { lat: 39.8406, lon: 45.6725, photo: "tour-jermuk", time: "2 h 45",
      en: ["Jermuk", "Spa town of mineral springs, a waterfall and a ropeway."],
      ru: ["Джермук", "Курорт минеральных источников с водопадом и канатной дорогой."] },
    karahunj: { lat: 39.5511, lon: 46.0286, photo: "tour-tatev-3", time: "3 h 30",
      en: ["Karahunj", "Standing stones often called Armenia's Stonehenge (Zorats Karer)."],
      ru: ["Караундж", "Древние стоящие камни, которые называют армянским Стоунхенджем (Зорац Карер)."] },
    tatev: { lat: 39.3797, lon: 46.2500, photo: "tour-tatev", time: "4 h",
      en: ["Tatev Monastery", "A monastery on the edge of the Vorotan gorge, reached by a long ropeway."],
      ru: ["Монастырь Татев", "Монастырь на краю ущелья Воротан, к нему ведёт длинная канатная дорога."] },
    khndzoresk: { lat: 39.5053, lon: 46.4361, photo: "tour-tatev-2", time: "4 h",
      en: ["Khndzoresk", "An old cave village with a swinging bridge."],
      ru: ["Хндзореск", "Старинное пещерное село с подвесным мостом."] },
    goris: { lat: 39.5111, lon: 46.3389, photo: null, time: "3 h 45", pkgOnly: true,
      en: ["Goris", "A town among rock formations, used as an overnight stop."],
      ru: ["Горис", "Город среди каменных столбов, место ночёвки."] },
    sevan: { lat: 40.5646, lon: 45.0126, photo: "tour-geghard-2", time: "1 h",
      en: ["Lake Sevan", "High mountain lake with the Sevanavank monastery on its peninsula."],
      ru: ["Озеро Севан", "Высокогорное озеро с монастырём Севанаванк на полуострове."] },
    hayravank: { lat: 40.4538, lon: 45.1108, photo: "tour-hayravank-2", time: "1 h 15",
      en: ["Hayravank", "A small monastery on Sevan's western shore."],
      ru: ["Айраванк", "Небольшой монастырь на западном берегу Севана."] },
    noratus: { lat: 40.3747, lon: 45.1811, photo: "tour-hayravank-3", time: "1 h 30",
      en: ["Noratus", "A field of hundreds of medieval carved stone crosses (khachkars)."],
      ru: ["Норатус", "Поле с сотнями средневековых хачкаров — резных каменных крестов."] },
    tsaghkadzor: { lat: 40.5333, lon: 44.7167, photo: "tour-tsaghkadzor-2", time: "50 min",
      en: ["Tsaghkadzor", "Mountain resort with a ropeway and Kecharis Monastery."],
      ru: ["Цахкадзор", "Горный курорт с канатной дорогой и монастырём Кечарис."] },
    dilijan: { lat: 40.7417, lon: 44.8636, photo: "tour-sevan-2", time: "1 h 30",
      en: ["Dilijan", "Old-town lanes and craft workshops in the forest."],
      ru: ["Дилижан", "Улочки старого города и ремесленные мастерские среди леса."] },
    parz: { lat: 40.7527, lon: 44.9616, photo: "tour-sevan-3", time: "1 h 45",
      en: ["Lake Parz", "A quiet forest lake above Dilijan."],
      ru: ["Озеро Парз", "Тихое лесное озеро над Дилижаном."] },
    haghartsin: { lat: 40.8016, lon: 44.8906, photo: "tour-tsaghkadzor", time: "1 h 45",
      en: ["Haghartsin", "A medieval monastery hidden in Dilijan's forests."],
      ru: ["Агарцин", "Средневековый монастырь в лесах Дилижана."] },
    dimats: { lat: 40.6900, lon: 44.9300, photo: "tour-dimats", time: "1 h 45", season: ["May–Oct", "май–октябрь"],
      en: ["Mount Dimats", "Off-road climb to ridge views above Dilijan."],
      ru: ["Гора Димац", "Подъём на внедорожнике к видам с хребта над Дилижаном."] },
    gyumri: { lat: 40.7894, lon: 43.8475, photo: "tour-gyumri", time: "2 h",
      en: ["Gyumri", "Black-stone streets and carriage rides in Armenia's second city."],
      ru: ["Гюмри", "Улицы из чёрного туфа и прогулки в карете по второму городу Армении."] },
    marmashen: { lat: 40.8846, lon: 43.7935, photo: null, time: "2 h 15",
      en: ["Marmashen", "A riverside monastery north of Gyumri."],
      ru: ["Мармашен", "Монастырь у реки к северу от Гюмри."] },
    aparan: { lat: 40.5936, lon: 44.3589, photo: null, time: "1 h",
      en: ["Aparan", "Highland town, a stop on the road north."],
      ru: ["Апаран", "Высокогорный город на пути на север."] },
    lori: { lat: 41.0015, lon: 44.4382, photo: "tour-aparan", time: "2 h 45", season: ["May–Oct", "май–октябрь"],
      en: ["Lori Berd & Stepanavan", "Medieval fortress above a gorge, the Dendropark, horseback riding and Amrakits."],
      ru: ["Лори Берд и Степанаван", "Средневековая крепость над ущельем, дендропарк, конные прогулки и Амракиц."] },
    vanadzor: { lat: 40.8128, lon: 44.4883, photo: null, time: "2 h", pkgOnly: true,
      en: ["Vanadzor", "Armenia's third city, used as an overnight stop."],
      ru: ["Ванадзор", "Третий по величине город Армении, место ночёвки."] },
    kasagh: { lat: 40.3720, lon: 44.3900, photo: "tour-amberd-2", time: "40 min",
      en: ["Saghmosavank & Alphabet Valley", "Two monasteries above the Kasagh gorge and the giant stone letters."],
      ru: ["Сагмосаванк и Долина алфавита", "Два монастыря над ущельем Касах и огромные каменные буквы."] },
    amberd: { lat: 40.3889, lon: 44.2258, photo: "tour-amberd", time: "1 h 15", season: ["May–Oct", "май–октябрь"],
      en: ["Amberd & Byurakan", "Hilltop fortress on Aragats and the Byurakan Observatory."],
      ru: ["Амберд и Бюракан", "Крепость на склоне Арагаца и Бюраканская обсерватория."] },
    kari: { lat: 40.4747, lon: 44.1869, photo: "tour-amberd-3", time: "1 h 30", season: ["Jun–Sep", "июнь–сентябрь"],
      en: ["Lake Kari", "Alpine lake high on Mount Aragats."],
      ru: ["Озеро Кари", "Высокогорное озеро на Арагаце."] },
    wineries: { lat: 40.2758, lon: 44.2969, photo: null, time: "40 min", pkgOnly: true,
      en: ["Aragatsotn wineries", "Van Ardi and Voskevaz wineries."],
      ru: ["Винодельни Арагацотна", "Винодельни Van Ardi и Voskevaz."] }
  };

  var PHOTO_CREDITS = {
    "tour-yerevan": "Vyacheslav Argenberg / Wikimedia Commons (CC BY 4.0)",
    "tour-echmiadzin": "Armen888 / Wikimedia Commons (CC BY-SA 4.0)",
    "tour-garni-2": "Beko / Wikimedia Commons (CC BY-SA 4.0)",
    "tour-garni": "Diego Delso, delso.photo, CC BY-SA",
    "tour-geghard": "Diego Delso, delso.photo / Wikimedia Commons (CC BY-SA 4.0)",
    "tour-azat": "mk4oto / Wikimedia Commons (CC BY-SA 4.0)",
    "tour-khorvirap": "Vyacheslav Argenberg / Wikimedia Commons (CC BY 4.0)",
    "tour-khorvirap-2": "Serouj / Wikimedia Commons (CC BY 3.0)",
    "tour-khorvirap-3": "gailhampshire / Wikimedia Commons (CC BY 2.0)",
    "tour-jermuk": "MEDIACRAT / Wikimedia Commons (CC BY-SA 3.0)",
    "tour-tatev-3": "Armen Manukov / Wikimedia Commons (CC BY-SA 3.0)",
    "tour-tatev": "Alexander Naumov / Wikimedia Commons (CC BY 3.0)",
    "tour-tatev-2": "Arian Zwegers / Wikimedia Commons (CC BY 2.0)",
    "tour-geghard-2": "Alexxx1979 / Wikimedia Commons (CC BY-SA 4.0)",
    "tour-hayravank-2": "Azniv Stepanian / Wikimedia Commons (CC BY-SA 4.0)",
    "tour-hayravank-3": "Eupator / Wikimedia Commons (CC BY-SA 3.0)",
    "tour-tsaghkadzor-2": "Marion & Christoph Aistleitner / Wikimedia Commons (CC0)",
    "tour-sevan-2": "Textfabrikant / Wikimedia Commons (CC0)",
    "tour-sevan-3": "Serouj / Wikimedia Commons (Public domain)",
    "tour-tsaghkadzor": "Aleksey Chalabyan / Wikimedia Commons (CC BY-SA 4.0)",
    "tour-dimats": "Wowan1978 / Wikimedia Commons (CC BY-SA 4.0)",
    "tour-gyumri": "O'micron / Wikimedia Commons (CC BY-SA 4.0)",
    "tour-aparan": "Armina Signature Travel",
    "tour-amberd-2": "Vahagn Grigoryan / Wikimedia Commons (CC BY-SA 4.0)",
    "tour-amberd": "Vahagn Grigoryan / Wikimedia Commons (CC BY-SA 4.0)",
    "tour-amberd-3": "GeoO / Wikimedia Commons (CC BY-SA 4.0)"
  };

  /* stops (in order, after leaving Yerevan), rough length and themes, keyed by the site's tour slot */
  var TOUR_STOPS = {
    "tour-garni": { stops: ["charents", "garni", "geghard"], hours: 6, themes: ["monasteries", "nature"] },
    "tour-sevan": { stops: ["sevan", "dilijan", "parz"], hours: 10, themes: ["nature"] },
    "tour-yerevan": { stops: [], hours: 6, themes: ["city"] },
    "tour-gyumri": { stops: ["gyumri", "marmashen"], hours: 10, themes: ["city", "monasteries"] },
    "tour-echmiadzin": { stops: ["echmiadzin"], hours: 5, themes: ["monasteries"] },
    "tour-aparan": { stops: ["aparan", "lori"], hours: 11, themes: ["adventure", "nature"] },
    "tour-azat": { stops: ["garni", "azat"], hours: 4, themes: ["adventure"] },
    "tour-dimats": { stops: ["sevan", "dilijan", "dimats"], hours: 9, themes: ["adventure", "nature"] },
    "tour-khorvirap": { stops: ["khorvirap", "areni", "noravank"], hours: 8, themes: ["monasteries", "wine"] },
    "tour-hayravank": { stops: ["noratus", "hayravank", "sevan"], hours: 8, themes: ["monasteries", "nature"] },
    "tour-erebuni": { stops: [], hours: 7, themes: ["city"] },
    "tour-gum": { stops: [], hours: 6, themes: ["city"] },
    "tour-jermuk": { stops: ["areni", "jermuk"], hours: 10, themes: ["wine", "nature"] },
    "tour-tatev": { stops: ["areni", "tatev", "khndzoresk", "karahunj"], hours: 14, themes: ["wine", "monasteries"] },
    "tour-geghard": { stops: ["garni", "geghard", "sevan", "tsaghkadzor"], hours: 10, themes: ["monasteries", "nature"] },
    "tour-tsaghkadzor": { stops: ["tsaghkadzor", "sevan", "dilijan", "haghartsin"], hours: 9, themes: ["adventure", "nature", "monasteries"] },
    "tour-amberd": { stops: ["kasagh", "kari", "amberd"], hours: 8, themes: ["monasteries", "nature"] }
  };

  /* per-day stops and overnight place, keyed by the site's package slot (day titles come from the page) */
  var DAY2 = ["charents", "garni", "geghard"];
  var PACKAGE_DAYS = {
    "pkg-classic": { days: [
      { stops: [], night: "yerevan" }, { stops: DAY2, night: "yerevan" },
      { stops: ["sevan", "dilijan", "parz"], night: "vanadzor" }, { stops: ["lori"], night: "yerevan" },
      { stops: ["areni", "noravank"], night: "goris" }, { stops: ["khndzoresk", "tatev"], night: "yerevan" }] },
    "pkg-highlands": { days: [
      { stops: [], night: "yerevan" }, { stops: DAY2, night: "yerevan" },
      { stops: ["khorvirap", "areni", "noravank"], night: "jermuk" }, { stops: [], night: "jermuk" },
      { stops: [], night: "jermuk" }, { stops: [], night: "yerevan" }, { stops: [], end: true }] },
    "pkg-grand": { nightsUnknown: true, days: [
      { stops: [] }, { stops: ["garni", "geghard"] }, { stops: ["wineries"] }, { stops: ["hayravank", "noratus"] },
      { stops: ["areni", "noravank"] }, { stops: ["echmiadzin"] }, { stops: [], end: true }] }
  };

  var REGIONS = [
    ["Շիրակ", "SHIRAK", "ШИРАК", 41.03, 43.98], ["Լոռի", "LORI", "ЛОРИ", 41.13, 44.30], ["Տավուշ", "TAVUSH", "ТАВУШ", 41.02, 45.15],
    ["Արագածոտն", "ARAGATSOTN", "АРАГАЦОТН", 40.62, 44.02], ["Կոտայք", "KOTAYK", "КОТАЙК", 40.45, 44.53],
    ["Գեղարքունիք", "GEGHARKUNIK", "ГЕГАРКУНИК", 40.18, 45.42], ["Արմավիր", "ARMAVIR", "АРМАВИР", 40.03, 43.98],
    ["Արարատ", "ARARAT", "АРАРАТ", 39.93, 44.86], ["Վայոց Ձոր", "VAYOTS DZOR", "ВАЙОЦ ДЗОР", 39.93, 45.38],
    ["Սյունիք", "SYUNIK", "СЮНИК", 39.17, 46.28]
  ];
  var COUNTRIES = [["GEORGIA", "ГРУЗИЯ", 41.33, 44.55], ["AZERBAIJAN", "АЗЕРБАЙДЖАН", 40.78, 46.30], ["IRAN", "ИРАН", 38.80, 46.55],
    ["TÜRKIYE", "ТУРЦИЯ", 39.95, 43.50], ["NAKHCHIVAN (AZ)", "НАХИЧЕВАНЬ (АЗ)", 39.28, 45.30]];

  var T = {
    en: {
      mapTitle: "Map of Armenia with tour routes from Yerevan", tours: "Day tours", packages: "Packages",
      plan: "Plan my own route", back: "Back to tours",
      hintTours: "Hover over or tap a tour to draw its route", hintPkgs: "Hover over a day to trace it", hintPlan: "Tap places to add them to your route",
      themes: [["all", "All"], ["monasteries", "Monasteries"], ["wine", "Wine"], ["nature", "Lakes & nature"], ["adventure", "Adventure"], ["city", "City"]],
      lengths: [["any", "Any length"], ["short", "Up to 7 h"], ["long", "Full day, 8 h+"]],
      yerevan: "Yerevan", hubSub: "EVERY TOUR STARTS HERE", hubCity: "CITY WALK", cityWalk: "A walking day in Yerevan",
      itinerary: "Full itinerary", none: "No tours match these filters.", overnight: "Overnight: ", day: "Day",
      nightsUnknown: "The overnight stops for this package aren't listed yet, so each day is drawn as a return to Yerevan.",
      planIntro: "Tap places on the map to add them, up to 5. Tap again to remove.", planEmpty: "No places yet.",
      msgLabel: "Your WhatsApp message", msgHead: "Hello! Could you plan a private trip for us that covers:", msgFoot: "(Made on your website map)",
      pickOne: "Pick at least one place.", ask: "Ask on WhatsApp", limit: "Up to 5 places. Remove one first.", remove: "Remove",
      cityTours: "City tours", onTours: "On these tours", inPackages: "In packages", photo: "Photo: ", close: "Close",
      araratView: "Ararat view", fromYerevan: " from Yerevan", best: "Best ", araratName: "Mount Ararat · Masis", araratNote: "(in Türkiye, seen from Armenia)"
    },
    ru: {
      mapTitle: "Карта Армении с маршрутами туров из Еревана", tours: "Однодневные туры", packages: "Пакеты",
      plan: "Свой маршрут", back: "Назад к турам",
      hintTours: "Наведите на тур или нажмите на него, чтобы увидеть маршрут", hintPkgs: "Наведите на день, чтобы увидеть его маршрут", hintPlan: "Нажимайте на места, чтобы добавить их в маршрут",
      themes: [["all", "Все"], ["monasteries", "Монастыри"], ["wine", "Вино"], ["nature", "Озёра и природа"], ["adventure", "Приключения"], ["city", "Город"]],
      lengths: [["any", "Любая длительность"], ["short", "До 7 ч"], ["long", "Весь день, от 8 ч"]],
      yerevan: "Ереван", hubSub: "ВСЕ ТУРЫ НАЧИНАЮТСЯ ЗДЕСЬ", hubCity: "ПРОГУЛКА ПО ГОРОДУ", cityWalk: "Пешая прогулка по Еревану",
      itinerary: "Полная программа", none: "Нет туров с такими фильтрами.", overnight: "Ночёвка: ", day: "День",
      nightsUnknown: "Ночёвки для этого пакета пока не указаны, поэтому каждый день показан с возвращением в Ереван.",
      planIntro: "Нажимайте на места на карте, чтобы добавить их (до 5). Повторное нажатие убирает место.", planEmpty: "Пока ничего не выбрано.",
      msgLabel: "Ваше сообщение в WhatsApp", msgHead: "Здравствуйте! Можете составить для нас индивидуальную поездку, которая включает:", msgFoot: "(Маршрут составлен на карте на сайте)",
      pickOne: "Выберите хотя бы одно место.", ask: "Спросить в WhatsApp", limit: "Не больше 5 мест. Сначала уберите одно.", remove: "Убрать",
      cityTours: "Городские туры", onTours: "В этих турах", inPackages: "В пакетах", photo: "Фото: ", close: "Закрыть",
      araratView: "Вид на Арарат", fromYerevan: " от Еревана", best: "Лучше всего: ", araratName: "Гора Арарат · Масис", araratNote: "(в Турции, вид из Армении)"
    }
  };

  var CSS = [
    ".rm{--rm-land:#ebe5da;--rm-land-stroke:#b4a68e;--rm-lake:#cdd7d7;--rm-lake-stroke:#9eb0b1;--rm-accent:var(--color-accent,#b68235);--rm-a700:var(--color-accent-700,#7d5411);--rm-a100:var(--color-accent-100,#fff3e4);--rm-line:var(--color-divider,rgba(32,31,29,.16));--rm-text:var(--color-text,#201f1d);--rm-muted:var(--color-neutral-700,#605d5d);--rm-body:var(--font-body,Georgia,serif);--rm-head:var(--font-heading,Georgia,serif);font-family:var(--rm-body);color:var(--rm-text)}",
    ".rm button{font:inherit;color:inherit}",
    ".rm [hidden]{display:none !important}",
    ".rm-filters{display:flex;flex-wrap:wrap;gap:8px 18px;margin-bottom:16px}",
    ".rm-chips{display:flex;flex-wrap:wrap;gap:6px}",
    ".rm-chip{border:1px solid var(--rm-line);background:transparent;border-radius:999px;padding:6px 13px;font-size:13px;cursor:pointer;transition:background .15s ease,border-color .15s ease}",
    ".rm-chip:hover{border-color:var(--rm-accent)}",
    ".rm-chip[aria-pressed=true]{background:var(--rm-a700);border-color:var(--rm-a700);color:#fff}",
    ".rm-chip .n{opacity:.7;margin-left:4px;font-variant-numeric:tabular-nums}",
    ".rm-grid{display:grid;grid-template-columns:minmax(0,1.55fr) minmax(290px,1fr);gap:22px;align-items:stretch}",
    ".rm-mapbox{position:relative}",
    ".rm-svg{display:block;width:100%;height:auto;max-width:100%;aspect-ratio:1000/1009}",
    ".rm-hint{position:absolute;top:8px;left:8px;font-size:12.5px;color:var(--rm-muted);background:rgba(243,242,242,.86);padding:5px 10px;border-radius:4px;pointer-events:none}",
    ".rm-panel{position:relative;min-height:360px}",
    ".rm-panel-inner{position:absolute;inset:0;display:flex;flex-direction:column;border:1px solid var(--rm-line);border-radius:6px;background:rgba(255,255,255,.45);overflow:hidden}",
    ".rm-head{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:10px 12px;border-bottom:1px solid var(--rm-line);flex-wrap:wrap}",
    ".rm-tabs{display:flex;gap:4px}",
    ".rm-tab{border:0;background:transparent;padding:6px 10px;border-radius:4px;font-size:12.5px;letter-spacing:.06em;text-transform:uppercase;cursor:pointer;color:var(--rm-muted)}",
    ".rm-tab[aria-selected=true]{background:var(--rm-a100);color:var(--rm-a700);font-weight:600}",
    ".rm-plan{border:1px solid var(--rm-accent);color:var(--rm-a700);background:transparent;border-radius:4px;padding:6px 11px;font-size:12.5px;cursor:pointer}",
    ".rm-plan:hover,.rm-plan[aria-pressed=true]{background:color-mix(in srgb,var(--rm-accent) 14%,transparent)}",
    ".rm-scroll{flex:1;overflow:auto;padding:6px;overscroll-behavior:contain}",
    ".rm-item{border:1px solid transparent;border-radius:5px}",
    ".rm-item:hover,.rm-item.hl{background:#fff;border-color:var(--rm-line)}",
    ".rm-item.sel{background:#fff;border-color:var(--rm-accent);box-shadow:var(--shadow-md,0 3px 10px rgba(45,43,43,.16))}",
    ".rm-main{display:grid;grid-template-columns:56px 1fr;gap:12px;width:100%;text-align:left;border:0;background:transparent;padding:8px;cursor:pointer}",
    ".rm-thumb{width:56px;height:56px;border-radius:4px;object-fit:cover;display:block;background:var(--rm-a100)}",
    ".rm-title{display:block;font-family:var(--rm-head);font-weight:600;font-size:18.5px;line-height:1.15}",
    ".rm-meta{display:flex;flex-wrap:wrap;align-items:center;gap:4px 8px;margin-top:4px;font-size:11.5px;letter-spacing:.08em;text-transform:uppercase;color:var(--rm-a700)}",
    ".rm-pill{font-size:10.5px;letter-spacing:.06em;text-transform:none;padding:1px 7px;border-radius:999px;background:#e9f0e6;color:#3f5b35}",
    ".rm-pill.warm{background:var(--rm-a100);color:var(--rm-a700)}",
    ".rm-more{display:flex;flex-direction:column;gap:8px;padding:0 10px 10px}",
    ".rm-chain{font-size:13px;line-height:1.55;color:var(--color-neutral-800,#444141)}",
    ".rm-chain b{color:var(--rm-a700);font-weight:600}",
    ".rm-btn{align-self:flex-start;display:inline-block;border:1px solid var(--rm-accent);background:transparent;color:var(--rm-a700);border-radius:4px;padding:6px 12px;font-size:12.5px;letter-spacing:.05em;cursor:pointer;text-decoration:none}",
    ".rm-btn:hover{background:color-mix(in srgb,var(--rm-accent) 12%,transparent);color:var(--rm-a700)}",
    ".rm-btn[aria-disabled=true]{opacity:.45;pointer-events:none}",
    ".rm-empty{padding:20px 12px;font-size:13.5px;color:var(--rm-muted);font-style:italic}",
    ".rm-pkgs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px;padding:4px 2px 10px;border-bottom:1px solid var(--rm-line);margin-bottom:6px}",
    ".rm-pkg{display:flex;flex-direction:column;gap:4px;text-align:left;border:1px solid var(--rm-line);background:transparent;border-radius:5px;padding:6px;cursor:pointer}",
    ".rm-pkg img{width:100%;aspect-ratio:16/9;object-fit:cover;border-radius:3px;display:block}",
    ".rm-pkg span{font-size:12px;line-height:1.3;font-weight:600}",
    ".rm-pkg small{font-size:10.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--rm-a700)}",
    ".rm-pkg[aria-pressed=true]{border-color:var(--rm-accent);background:#fff;box-shadow:var(--shadow-md,0 3px 10px rgba(45,43,43,.16))}",
    ".rm-day{display:grid;grid-template-columns:30px 1fr;gap:10px;padding:9px 8px;border-radius:5px}",
    ".rm-day:hover,.rm-day.hl{background:#fff}",
    ".rm-day-n{width:26px;height:26px;border-radius:50%;background:var(--rm-a700);color:#fff;display:grid;place-items:center;font-size:12.5px;font-weight:600;font-variant-numeric:tabular-nums}",
    ".rm-day-t{font-size:14px;line-height:1.45}",
    ".rm-night{display:flex;align-items:center;gap:5px;margin-top:3px;font-size:12px;color:var(--rm-muted)}",
    ".rm-night svg{width:15px;height:15px}",
    ".rm-note{margin:6px 8px;font-size:12.5px;line-height:1.5;color:var(--rm-muted);font-style:italic}",
    ".rm-pkg-open{margin:8px}",
    ".rm-planner{display:flex;flex-direction:column;gap:12px;padding:8px 8px 12px}",
    ".rm-planner p{margin:0;font-size:13.5px;line-height:1.55}",
    ".rm-picks{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:6px}",
    ".rm-picks li{display:grid;grid-template-columns:24px 1fr auto;gap:8px;align-items:center;font-size:14px;background:#fff;border:1px solid var(--rm-line);border-radius:5px;padding:6px 8px}",
    ".rm-picks .num{width:22px;height:22px;border-radius:50%;background:var(--rm-a700);color:#fff;font-size:12px;display:grid;place-items:center}",
    ".rm-picks button{border:0;background:transparent;cursor:pointer;color:var(--color-neutral-600,#7d7979);font-size:16px;line-height:1;padding:2px 6px}",
    ".rm-msg{background:#fff;border:1px solid var(--rm-line);border-radius:4px 12px 12px 12px;padding:12px 14px;box-shadow:var(--shadow-md,0 3px 10px rgba(45,43,43,.16));font-size:13.5px;line-height:1.6;white-space:pre-line}",
    ".rm-msg-label{font-size:10.5px;letter-spacing:.16em;text-transform:uppercase;color:var(--rm-muted);margin-bottom:4px}",
    ".rm-card{position:absolute;left:6px;bottom:6px;width:min(390px,54%);max-height:30%;overflow:auto;display:grid;grid-template-columns:92px 1fr;background:#fff;border:1px solid var(--rm-line);border-radius:6px;box-shadow:var(--shadow-lg,0 12px 32px rgba(45,43,43,.22))}",
    ".rm-card.no-photo{grid-template-columns:1fr}",
    ".rm-card img{display:block;width:92px;height:100%;min-height:110px;object-fit:cover}",
    ".rm-card-body{padding:10px 34px 10px 12px;display:flex;flex-direction:column;gap:4px;min-width:0}",
    ".rm-card-name{font-family:var(--rm-head);font-weight:600;font-size:20px;line-height:1.12}",
    ".rm-card-blurb{font-size:12.5px;line-height:1.5;color:var(--color-neutral-800,#444141)}",
    ".rm-badges{display:flex;flex-wrap:wrap;gap:5px}",
    ".rm-card-h{font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--rm-muted);margin-top:2px}",
    ".rm-links{display:flex;flex-direction:column;gap:2px}",
    ".rm-links button{border:0;background:transparent;padding:0;text-align:left;font-size:12.5px;line-height:1.4;color:var(--rm-a700);cursor:pointer;text-decoration:underline;text-decoration-color:color-mix(in srgb,var(--rm-accent) 45%,transparent);text-underline-offset:3px}",
    ".rm-credit{font-size:10.5px;color:var(--color-neutral-600,#7d7979)}",
    ".rm-x{position:absolute;top:6px;right:6px;width:26px;height:26px;border-radius:50%;border:0;background:rgba(32,31,29,.6);color:#fff !important;font-size:16px;line-height:1;cursor:pointer}",
    ".rm-toast{position:fixed;left:50%;bottom:24px;transform:translateX(-50%);background:#2d2b2b;color:#f3f2f2;padding:10px 16px;border-radius:6px;font-size:13.5px;box-shadow:0 8px 24px rgba(0,0,0,.3);z-index:300;max-width:calc(100% - 32px)}",
    ".rm-country{font:600 13px var(--rm-body);letter-spacing:.34em;fill:#bdb4a6}",
    ".rm-land{fill:var(--rm-land);stroke:var(--rm-land-stroke);stroke-width:1.5;stroke-linejoin:round}",
    ".rm-lake{fill:var(--rm-lake);stroke:var(--rm-lake-stroke);stroke-width:1}",
    ".rm-region-hy{font:500 21px 'Noto Serif Armenian',var(--rm-head);fill:#c9b99c;letter-spacing:.08em}",
    ".rm-region-lat{font:500 9.5px var(--rm-body);fill:#bfae90;letter-spacing:.3em}",
    ".rm-ararat-body{fill:#ddd5c7;stroke:#a99b84;stroke-width:1.2}",
    ".rm-ararat-snow{fill:#fff}",
    ".rm-ararat-label{font:italic 500 15px var(--rm-head);fill:#8b7c63}",
    ".rm-route{fill:none;stroke:var(--rm-accent);stroke-width:2.2;stroke-dasharray:7 7;stroke-linecap:round;opacity:.5;transition:opacity .25s ease}",
    ".rm-route.dim{opacity:.1}",
    ".rm-route-hit{fill:none;stroke:transparent;stroke-width:16;cursor:pointer}",
    ".rm-route-active{fill:none;stroke:var(--rm-a700);stroke-width:3.4;stroke-dasharray:9 7;stroke-linecap:round}",
    ".rm-route-plan{fill:none;stroke:#3f5b35;stroke-width:3.2;stroke-dasharray:9 7;stroke-linecap:round}",
    ".rm-dot{fill:var(--rm-accent);stroke:#fff;stroke-width:2.5}",
    ".rm-dot-hit{fill:transparent;cursor:pointer}",
    ".rm-dotg:hover .rm-dot{fill:var(--rm-a700)}",
    ".rm-dotg:focus{outline:none}",
    ".rm-dotg:focus-visible .rm-dot{stroke:var(--rm-a700);stroke-width:4}",
    ".rm-leader{stroke:var(--rm-a700);stroke-width:1.2}",
    ".rm-pin{cursor:pointer}",
    ".rm-pin:focus{outline:none}",
    ".rm-pin:focus-visible .rm-ring{stroke:var(--rm-a700);stroke-width:4}",
    ".rm-shadow{fill:rgba(45,43,43,.25)}",
    ".rm-ring{fill:#fff;stroke:var(--rm-accent);stroke-width:2.4}",
    ".rm-plain{fill:var(--rm-a100)}",
    ".rm-label{font:600 17px var(--rm-body);fill:#201f1d;paint-order:stroke;stroke:rgba(243,242,242,.92);stroke-width:5px;stroke-linejoin:round}",
    ".rm-time{font:500 13.5px var(--rm-body);fill:var(--rm-a700);paint-order:stroke;stroke:rgba(243,242,242,.92);stroke-width:5px;stroke-linejoin:round}",
    ".rm-badge-c{fill:var(--rm-a700);stroke:#fff;stroke-width:2}",
    ".rm-badge-t{font:600 12.5px var(--rm-body);fill:#fff}",
    ".rm-hub-ring{fill:#fff;stroke:var(--rm-a700);stroke-width:3}",
    ".rm-hub-label{font:600 20px var(--rm-head);fill:#201f1d;paint-order:stroke;stroke:rgba(243,242,242,.92);stroke-width:5px;letter-spacing:.04em}",
    ".rm-hub-sub{font:500 11.5px var(--rm-body);fill:var(--rm-a700);letter-spacing:.14em;paint-order:stroke;stroke:rgba(243,242,242,.92);stroke-width:4px}",
    ".rm-pulse{fill:none;stroke:var(--rm-a700);stroke-width:2;opacity:0}",
    ".rm-pulse.on{animation:rm-pulse 1.8s ease-out infinite}",
    "@keyframes rm-pulse{0%{opacity:.7;r:26}100%{opacity:0;r:60}}",
    ".rm-svg.no-regions .rm-regions,.rm-svg.no-ararat .rm-ararat,.rm-svg.no-ararat .rm-eye,.rm-svg.no-times .rm-time{display:none}",
    "@media (max-width:880px){.rm-grid{grid-template-columns:minmax(0,1fr)}.rm-mapbox,.rm-panel{min-width:0}.rm-panel{min-height:0}.rm-panel-inner{position:static}.rm-scroll{max-height:440px}",
    ".rm-scroll.h{display:flex;gap:10px;overflow-x:auto;overflow-y:hidden;scroll-snap-type:x mandatory;max-height:none;padding:10px}",
    ".rm-scroll.h .rm-item{flex:0 0 78%;scroll-snap-align:center;background:#fff;border-color:var(--rm-line)}",
    ".rm-scroll.h .rm-more{display:none}",
    ".rm-card{position:relative;left:auto;bottom:auto;width:100%;max-height:none;margin-top:12px}}",
    "@media (prefers-reduced-motion:reduce){.rm-pulse.on{animation:none;opacity:.5}.rm-route{transition:none}}"
  ].join("\n");

  var BED_SVG = '<svg viewBox="-8 -8 16 16" aria-hidden="true"><path d="M-6,4 V-4 M-6,1.5 H6 V4 M6,1.5 V-0.5 A2,2 0 0 0 4,-2.5 H-1.5 V1.5" fill="none" stroke="#7d5411" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="-3.6" cy="-1.2" r="1.4" fill="#7d5411"/></svg>';

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function thumbOf(src) { return THUMB + String(src || "").split("?")[0].split("/").pop(); }

  function mount(root, opts) {
    if (!root || root.__routeMap) return;
    root.__routeMap = true;
    if (!document.getElementById("rm-style")) {
      var st = document.createElement("style"); st.id = "rm-style"; st.textContent = CSS; document.head.appendChild(st);
    }
    var lang = opts.lang === "ru" ? "ru" : "en", L = T[lang];
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    Object.keys(PLACES).forEach(function (k) {
      var p = PLACES[k], c = xy(p.lat, p.lon);
      p.key = k; p.x = c.x; p.y = c.y; p.name = p[lang][0]; p.blurb = p[lang][1];
      p.img = p.photo ? THUMB + p.photo + ".jpg" : null;
    });
    PLACES.yerevan.name = L.yerevan;

    var TOURS = (opts.tours || []).filter(function (t) { return TOUR_STOPS[t.slot]; }).map(function (t, i) {
      var m = TOUR_STOPS[t.slot];
      return { id: t.slot, i: i, title: t.title, dur: t.dur, thumb: thumbOf(t.src), stops: m.stops, hours: m.hours, themes: m.themes };
    });
    var TOUR = {}; TOURS.forEach(function (t) { TOUR[t.id] = t; });
    var PACKAGES = (opts.packages || []).filter(function (p) { return PACKAGE_DAYS[p.slot]; }).map(function (p) {
      var m = PACKAGE_DAYS[p.slot];
      return { id: p.slot, title: p.title, dur: p.dur, photo: thumbOf(p.src), nightsUnknown: !!m.nightsUnknown,
        days: m.days.map(function (d, i) { return { stops: d.stops, night: d.night || null, end: !!d.end, title: (p.days || [])[i] || "" }; }) };
    });
    var PKG = {}; PACKAGES.forEach(function (p) { PKG[p.id] = p; });

    /* opens on Day tours with Sevan, Dilijan & Lake Parz; in Packages, `intro` draws the whole package route until a day is hovered */
    var S = { mode: "tours", intro: true, plan: false, theme: "all", len: "any",
      tour: TOUR["tour-sevan"] ? "tour-sevan" : (TOURS[0] && TOURS[0].id),
      hoverTour: null, pkg: PACKAGES[0] && PACKAGES[0].id, hoverDay: null, card: null, picks: [] };
    var lastActiveKey = null, placedBoxes = [];

    root.innerHTML =
      '<div class="rm">' +
      '<div class="rm-filters" data-r="filters"><div class="rm-chips" role="group" data-r="themes"></div><div class="rm-chips" role="group" data-r="lens"></div></div>' +
      '<div class="rm-grid"><div class="rm-mapbox">' +
      '<svg class="rm-svg" viewBox="0 0 1000 1009" role="img" aria-label="' + esc(L.mapTitle) + '"><defs>' +
      '<clipPath id="rm-clip-pin"><circle r="18"></circle></clipPath><clipPath id="rm-clip-hub"><circle r="23"></circle></clipPath>' +
      '<filter id="rm-soft" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="3" stdDeviation="6" flood-color="#2d2b2b" flood-opacity="0.16"></feDropShadow></filter></defs>' +
      '<g data-r="countries"></g><path class="rm-land" filter="url(#rm-soft)" data-r="land"></path><g data-r="lakes"></g>' +
      '<g class="rm-regions" data-r="regions"></g><g class="rm-ararat" data-r="ararat"></g><g data-r="routes"></g><g data-r="active"></g>' +
      '<g data-r="dots"></g><g data-r="pins"></g><g data-r="hub"></g><g data-r="labels" pointer-events="none"></g><g data-r="hover" pointer-events="none"></g></svg>' +
      '<div class="rm-hint" data-r="hint"></div><div class="rm-card" data-r="card" hidden></div></div>' +
      '<aside class="rm-panel"><div class="rm-panel-inner"><div class="rm-head"><div class="rm-tabs" role="tablist">' +
      '<button type="button" class="rm-tab" role="tab" data-r="tabTours">' + esc(L.tours) + '</button>' +
      '<button type="button" class="rm-tab" role="tab" data-r="tabPkgs">' + esc(L.packages) + '</button></div>' +
      '<button type="button" class="rm-plan" data-r="planBtn" aria-pressed="false"></button></div>' +
      '<div class="rm-scroll" data-r="panel"></div></div></aside></div></div>';
    var R = {}; root.querySelectorAll("[data-r]").forEach(function (n) { R[n.getAttribute("data-r")] = n; });
    var svg = root.querySelector(".rm-svg");

    function el(name, attrs, parent) {
      var n = document.createElementNS(NS, name);
      if (attrs) Object.keys(attrs).forEach(function (a) { n.setAttribute(a, attrs[a]); });
      if (parent) parent.appendChild(n);
      return n;
    }
    function clear(g) { while (g.firstChild) g.removeChild(g.firstChild); }
    function img(parent, href, r) {
      var im = el("image", { href: href, x: -r, y: -r, width: 2 * r, height: 2 * r, preserveAspectRatio: "xMidYMid slice", "clip-path": "url(#" + (r > 20 ? "rm-clip-hub" : "rm-clip-pin") + ")" }, parent);
      im.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", href);
    }
    var toastEl = null, toastTimer = null;
    function toast(msg) {
      if (!toastEl) { toastEl = document.createElement("div"); toastEl.className = "rm-toast"; toastEl.setAttribute("role", "status"); document.body.appendChild(toastEl); }
      toastEl.textContent = msg; toastEl.hidden = false;
      clearTimeout(toastTimer); toastTimer = setTimeout(function () { toastEl.hidden = true; }, 3200);
    }
    function seasonOf(t) { for (var i = 0; i < t.stops.length; i++) { var s = PLACES[t.stops[i]].season; if (s) return s[lang === "ru" ? 1 : 0]; } return null; }
    function visibleTours() {
      return TOURS.filter(function (t) {
        if (!OPT.filters) return true;
        if (S.theme !== "all" && t.themes.indexOf(S.theme) < 0) return false;
        if (S.len === "short" && t.hours > 7) return false;
        if (S.len === "long" && t.hours < 8) return false;
        return true;
      });
    }
    function legD(a, b, bend) {
      var mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2, dx = b.x - a.x, dy = b.y - a.y;
      return "Q" + (mx - dy * bend).toFixed(1) + "," + (my + dx * bend).toFixed(1) + " " + b.x.toFixed(1) + "," + b.y.toFixed(1);
    }
    function pathD(keys, bend) {
      if (keys.length < 2) return "";
      var d = "M" + PLACES[keys[0]].x.toFixed(1) + "," + PLACES[keys[0]].y.toFixed(1);
      for (var i = 1; i < keys.length; i++) d += legD(PLACES[keys[i - 1]], PLACES[keys[i]], bend);
      return d;
    }
    function tourD(t) { return pathD(["yerevan"].concat(t.stops), (t.i % 2 ? -1 : 1) * 0.1); }
    function dayLegs(pkg) {
      var prev = "yerevan";
      return pkg.days.map(function (d) {
        var end = d.end ? null : (d.night || "yerevan");
        var pts = [prev].concat(d.stops); if (end) pts.push(end);
        var clean = pts.filter(function (k, i) { return i === 0 || k !== pts[i - 1]; });
        if (end) prev = end;
        return clean;
      });
    }
    /* the whole package as one continuous path: each day starts where the previous night ended */
    function packageD(pkg) {
      var d = "";
      dayLegs(pkg).forEach(function (pts, i) {
        if (pts.length < 2) return;
        if (!d) d = "M" + PLACES[pts[0]].x.toFixed(1) + "," + PLACES[pts[0]].y.toFixed(1);
        for (var j = 1; j < pts.length; j++) d += legD(PLACES[pts[j - 1]], PLACES[pts[j]], i % 2 ? -0.12 : 0.12);
      });
      return d;
    }
    function lastStop(id) { var t = TOUR[id]; return t && t.stops.length ? t.stops[t.stops.length - 1] : "yerevan"; }

    /* static layers */
    R.land.setAttribute("d", GEO.armenia);
    el("path", { d: GEO.sevan, "class": "rm-lake" }, R.lakes);
    COUNTRIES.forEach(function (c) {
      var p = xy(c[2], c[3]), t = el("text", { x: p.x, y: p.y, "class": "rm-country", "text-anchor": "middle" }, R.countries);
      t.textContent = lang === "ru" ? c[1] : c[0];
    });
    REGIONS.forEach(function (r) {
      var p = xy(r[3], r[4]);
      el("text", { x: p.x, y: p.y, "class": "rm-region-hy", "text-anchor": "middle" }, R.regions).textContent = r[0];
      el("text", { x: p.x, y: p.y + 15, "class": "rm-region-lat", "text-anchor": "middle" }, R.regions).textContent = lang === "ru" ? r[2] : r[1];
    });
    (function () {
      var m = xy(39.7019, 44.2983);
      var g = el("g", { transform: "translate(" + m.x.toFixed(1) + "," + m.y.toFixed(1) + ")" }, R.ararat);
      el("path", { "class": "rm-ararat-body", d: "M-92,26 C-62,12 -34,-30 0,-46 C18,-40 34,-16 52,-4 C62,-16 76,-24 86,-24 C98,-16 112,6 128,26 Z" }, g);
      el("path", { "class": "rm-ararat-snow", d: "M-20,-34 C-10,-42 8,-44 16,-36 L9,-30 L3,-35 L-5,-28 L-11,-33 Z" }, g);
      el("path", { "class": "rm-ararat-snow", d: "M78,-20 C82,-24 90,-24 94,-19 L89,-16 L85,-19 L81,-16 Z" }, g);
      el("text", { x: 18, y: 48, "class": "rm-ararat-label", "text-anchor": "middle" }, g).textContent = L.araratName;
      el("text", { x: 18, y: 66, "class": "rm-ararat-label", "text-anchor": "middle", style: "font-size:12.5px" }, g).textContent = L.araratNote;
    })();
    svg.classList.toggle("no-regions", !OPT.regions);
    svg.classList.toggle("no-ararat", !OPT.ararat);
    svg.classList.toggle("no-times", !OPT.times);

    /* dynamic layers */
    function placesForMode() {
      var set = {};
      if (S.plan) Object.keys(PLACES).forEach(function (k) { if (k !== "yerevan") set[k] = 1; });
      else if (S.mode === "pkgs" && PKG[S.pkg]) PKG[S.pkg].days.forEach(function (d) { d.stops.forEach(function (k) { set[k] = 1; }); if (d.night && d.night !== "yerevan") set[d.night] = 1; });
      else visibleTours().forEach(function (t) { t.stops.forEach(function (k) { set[k] = 1; }); });
      return Object.keys(set);
    }
    function onActivate(node, fn) {
      node.addEventListener("click", fn);
      node.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); fn(); } });
    }
    function drawDots() {
      clear(R.dots);
      placesForMode().forEach(function (k) {
        var p = PLACES[k];
        var dg = el("g", { "class": "rm-dotg", transform: "translate(" + p.x.toFixed(1) + "," + p.y.toFixed(1) + ")", tabindex: "0", role: "button", "aria-label": p.name }, R.dots);
        el("circle", { r: 15, "class": "rm-dot-hit" }, dg);
        el("circle", { r: 6.5, "class": "rm-dot" }, dg);
        dg.addEventListener("mouseenter", function () { showHover(k); });
        dg.addEventListener("mouseleave", function () { clear(R.hover); });
        dg.addEventListener("focus", function () { showHover(k); });
        dg.addEventListener("blur", function () { clear(R.hover); });
        onActivate(dg, function () { placeClicked(k); });
      });
    }
    function drawRoutes() {
      clear(R.routes);
      if (S.plan) return;
      if (S.mode === "pkgs") {
        if (!PKG[S.pkg]) return;
        dayLegs(PKG[S.pkg]).forEach(function (pts, i) {
          if (pts.length > 1) el("path", { d: pathD(pts, i % 2 ? -0.12 : 0.12), "class": "rm-route", "data-day": i }, R.routes);
        });
        return;
      }
      visibleTours().forEach(function (t) {
        var d = tourD(t); if (!d) return;
        el("path", { d: d, "class": "rm-route", "data-id": t.id }, R.routes);
        var hit = el("path", { d: d, "class": "rm-route-hit" }, R.routes);
        hit.addEventListener("mouseenter", function () { setHoverTour(t.id); });
        hit.addEventListener("mouseleave", function () { setHoverTour(null); });
        hit.addEventListener("click", function () { selectTour(t.id); });
      });
    }
    function layout(keys, r, hubR) {
      var hub = PLACES.yerevan;
      var nodes = keys.map(function (k) { return { k: k, x0: PLACES[k].x, y0: PLACES[k].y, x: PLACES[k].x, y: PLACES[k].y }; });
      var min = 2 * r + 8;
      for (var it = 0; it < 80; it++) {
        for (var i = 0; i < nodes.length; i++) {
          var a = nodes[i], hdx = a.x - hub.x, hdy = a.y - hub.y, hd = Math.hypot(hdx, hdy) || 0.01, hmin = r + hubR + 8;
          if (hd < hmin) { a.x += hdx / hd * (hmin - hd); a.y += hdy / hd * (hmin - hd); }
          for (var j = i + 1; j < nodes.length; j++) {
            var b = nodes[j], dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy);
            if (d < 0.01) { dx = 1; dy = 0.5; d = 1.1; }
            if (d < min) { var push = (min - d) / 2, ux = dx / d, uy = dy / d; a.x -= ux * push; a.y -= uy * push; b.x += ux * push; b.y += uy * push; }
          }
        }
        nodes.forEach(function (n) { n.x += (n.x0 - n.x) * 0.04; n.y += (n.y0 - n.y) * 0.04; });
      }
      return nodes;
    }
    /* labels go on whichever side (right, left, below, above) collides least */
    function hasTime(p) { return OPT.times && !!p.time; }
    function labelBox(n, side) {
      var p = PLACES[n.k], r = 18, w = p.name.length * 9.4 + 6, h = hasTime(p) ? 36 : 20, off = r + 8;
      if (side === "r") return [n.x + off, n.y - 16, n.x + off + w, n.y - 16 + h];
      if (side === "l") return [n.x - off - w, n.y - 16, n.x - off, n.y - 16 + h];
      if (side === "b") return [n.x - w / 2, n.y + r + 6, n.x + w / 2, n.y + r + 6 + h];
      return [n.x - w / 2, n.y - r - 8 - h, n.x + w / 2, n.y - r - 8];
    }
    function overlap(a, b) {
      var x = Math.min(a[2], b[2]) - Math.max(a[0], b[0]), y = Math.min(a[3], b[3]) - Math.max(a[1], b[1]);
      return x > 0 && y > 0 ? x * y : 0;
    }
    function bestSide(n, obstacles) {
      var best = "r", bestCost = Infinity;
      ["r", "l", "b", "t"].forEach(function (s) {
        var b = labelBox(n, s), cost = 0;
        if (b[0] < 4 || b[2] > 996 || b[1] < 4 || b[3] > 1005) cost += 5000;
        obstacles.forEach(function (o) { cost += overlap(b, o); });
        if (cost < bestCost - 0.5) { bestCost = cost; best = s; }
      });
      return best;
    }
    /* the "every tour starts here" caption only makes sense in the day-tours view */
    function hubCaption() { return S.mode === "tours" && !S.plan; }
    function placeLabels(nodes) {
      var hub = PLACES.yerevan;
      var obstacles = nodes.map(function (n) { return [n.x - 22, n.y - 22, n.x + 22, n.y + 22]; });
      obstacles.push([hub.x - 31, hub.y - 31, hub.x + 31, hub.y + 31]);
      obstacles.push([hub.x - 45, hub.y + 30, hub.x + 45, hub.y + 54]);
      if (hubCaption()) obstacles.push([hub.x - 105, hub.y + 52, hub.x + 105, hub.y + 68]);
      var placed = [], sides = {};
      nodes.forEach(function (n) { var s = bestSide(n, obstacles.concat(placed)); sides[n.k] = s; placed.push(labelBox(n, s)); });
      placedBoxes = obstacles.concat(placed);
      return sides;
    }
    function drawPin(g, n, o) {
      var p = PLACES[n.k], r = 18;
      if (Math.hypot(n.x - n.x0, n.y - n.y0) > 4) {
        el("line", { x1: n.x0, y1: n.y0, x2: n.x, y2: n.y, "class": "rm-leader" }, g);
        el("circle", { cx: n.x0, cy: n.y0, r: 3.5, fill: "#7d5411" }, g);
      }
      var pg = el("g", { "class": "rm-pin", transform: "translate(" + n.x.toFixed(1) + "," + n.y.toFixed(1) + ")" }, g);
      if (o.interactive) { pg.setAttribute("tabindex", "0"); pg.setAttribute("role", "button"); pg.setAttribute("aria-label", p.name); }
      el("circle", { r: r + 3.5, cy: 2, "class": "rm-shadow" }, pg);
      el("circle", { r: r + 2.5, "class": "rm-ring" }, pg);
      if (p.img) img(pg, p.img, r);
      else { el("circle", { r: r, "class": "rm-plain" }, pg); el("circle", { r: 5, fill: "#b68235" }, pg); }
      var bx = r * 0.72, by = -r * 0.72;
      if (o.badge) {
        el("circle", { cx: bx, cy: by, r: 10, "class": "rm-badge-c" }, pg);
        el("text", { x: bx, y: by + 4.3, "class": "rm-badge-t", "text-anchor": "middle" }, pg).textContent = o.badge;
      }
      if (o.bed) {
        var bg = el("g", { transform: "translate(" + (-bx) + "," + by + ")" }, pg);
        el("circle", { r: 10.5, "class": "rm-badge-c" }, bg);
        el("path", { d: "M-6,4 V-4 M-6,1.5 H6 V4 M6,1.5 V-0.5 A2,2 0 0 0 4,-2.5 H-1.5 V1.5", fill: "none", stroke: "#fff", "stroke-width": 1.5, "stroke-linecap": "round", "stroke-linejoin": "round" }, bg);
        el("circle", { cx: -3.6, cy: -1.2, r: 1.4, fill: "#fff" }, bg);
      }
      if (p.ararat && !o.badge) {
        var eg = el("g", { "class": "rm-eye", transform: "translate(" + bx + "," + by + ")" }, pg);
        el("circle", { r: 10, fill: "#fff", stroke: "#7d5411", "stroke-width": 1.5 }, eg);
        el("path", { d: "M-6,0 C-3,-4 3,-4 6,0 C3,4 -3,4 -6,0 Z", fill: "none", stroke: "#7d5411", "stroke-width": 1.4 }, eg);
        el("circle", { r: 1.8, fill: "#7d5411" }, eg);
      }
      if (o.label) {
        /* labels sit in their own layer above every pin, so no photo can cover a name */
        var lg = el("g", { transform: "translate(" + n.x.toFixed(1) + "," + n.y.toFixed(1) + ")" }, o.labelLayer || g);
        var side = o.side || "r", ht = hasTime(p), off = r + 8, a, nx, ny, tx2, ty2;
        if (side === "r") { a = "start"; nx = off; ny = ht ? -1 : 6; tx2 = off; ty2 = 15; }
        else if (side === "l") { a = "end"; nx = -off; ny = ht ? -1 : 6; tx2 = -off; ty2 = 15; }
        else if (side === "b") { a = "middle"; nx = 0; ny = r + 22; tx2 = 0; ty2 = r + 38; }
        else { a = "middle"; nx = 0; ny = ht ? -r - 26 : -r - 10; tx2 = 0; ty2 = -r - 10; }
        el("text", { x: nx, y: ny, "class": "rm-label", "text-anchor": a }, lg).textContent = p.name;
        if (ht) el("text", { x: tx2, y: ty2, "class": "rm-time", "text-anchor": a }, lg).textContent = "≈ " + p.time;
      }
      if (o.interactive) onActivate(pg, function () { placeClicked(n.k); });
    }
    function drawHub(cityWalk) {
      clear(R.hub);
      var p = PLACES.yerevan;
      var hg = el("g", { "class": "rm-pin", transform: "translate(" + p.x.toFixed(1) + "," + p.y.toFixed(1) + ")", tabindex: "0", role: "button", "aria-label": p.name }, R.hub);
      el("circle", { r: 26, "class": "rm-pulse" + (cityWalk ? " on" : "") }, hg);
      el("circle", { r: 29, cy: 2, "class": "rm-shadow" }, hg);
      el("circle", { r: 27, "class": "rm-hub-ring" }, hg);
      img(hg, p.img, 23);
      el("text", { x: 0, y: 48, "class": "rm-hub-label", "text-anchor": "middle" }, hg).textContent = p.name;
      if (hubCaption()) el("text", { x: 0, y: 63, "class": "rm-hub-sub", "text-anchor": "middle" }, hg).textContent = cityWalk ? L.hubCity : L.hubSub;
      onActivate(hg, function () { placeClicked("yerevan"); });
    }
    function activePinKeys() {
      if (S.plan) return S.picks.slice();
      if (S.mode === "pkgs") return placesForMode();
      var id = S.hoverTour || S.tour;
      if (!id || visibleTours().indexOf(TOUR[id]) < 0) return [];
      return TOUR[id].stops.slice();
    }
    function showHover(k) {
      clear(R.hover);
      if (activePinKeys().indexOf(k) >= 0) return;
      var p = PLACES[k], n = { k: k, x: p.x, y: p.y, x0: p.x, y0: p.y };
      drawPin(R.hover, n, { label: true, side: bestSide(n, placedBoxes) });
    }
    function animateDraw(path) {
      if (reduce || !path.getTotalLength) return;
      var len = path.getTotalLength();
      var mask = el("mask", { id: "rm-draw-mask", maskUnits: "userSpaceOnUse", x: 0, y: 0, width: 1000, height: 1009 }, R.active);
      var mp = el("path", { d: path.getAttribute("d"), fill: "none", stroke: "#fff", "stroke-width": 12, "stroke-linecap": "round", "stroke-dasharray": len + " " + len, "stroke-dashoffset": len }, mask);
      path.setAttribute("mask", "url(#rm-draw-mask)");
      var start = null, dur = Math.min(1600, 500 + len * 1.1);
      function step(ts) {
        if (start === null) start = ts;
        var t = Math.min(1, (ts - start) / dur), e = 1 - Math.pow(1 - t, 3);
        mp.setAttribute("stroke-dashoffset", (len * (1 - e)).toFixed(1));
        if (t < 1 && mp.isConnected) requestAnimationFrame(step); else if (mp.isConnected) path.removeAttribute("mask");
      }
      requestAnimationFrame(step);
    }
    function updateHighlight() {
      clear(R.pins); clear(R.labels); clear(R.hover);
      var key = null, activeD = "", cls = "rm-route-active", cityWalk = false;
      var routes = R.routes.querySelectorAll(".rm-route");
      if (S.plan) {
        key = "plan:" + S.picks.join(",");
        activeD = pathD(["yerevan"].concat(S.picks), 0.08); cls = "rm-route-plan";
      } else if (S.mode === "pkgs") {
        var hd = S.hoverDay;
        routes.forEach(function (r) { r.classList.toggle("dim", hd !== null && +r.getAttribute("data-day") !== hd); });
        key = "pkg:" + S.pkg + ":" + (hd !== null ? hd : S.intro ? "intro" : "none");
        if (hd !== null && PKG[S.pkg]) { var pts = dayLegs(PKG[S.pkg])[hd]; if (pts.length > 1) activeD = pathD(pts, hd % 2 ? -0.12 : 0.12); }
        else if (S.intro && PKG[S.pkg]) activeD = packageD(PKG[S.pkg]);
      } else {
        var id = S.hoverTour || S.tour;
        if (id && visibleTours().indexOf(TOUR[id]) < 0) id = null;
        routes.forEach(function (r) { r.classList.toggle("dim", !!id && r.getAttribute("data-id") !== id); });
        if (id) { key = "tour:" + id; activeD = tourD(TOUR[id]); cityWalk = !TOUR[id].stops.length; }
      }
      if (key !== lastActiveKey) {
        clear(R.active);
        if (activeD) animateDraw(el("path", { d: activeD, "class": cls }, R.active));
        lastActiveKey = key;
      }
      var nodes = layout(activePinKeys(), 21, 29), badges = {}, beds = {};
      if (S.plan) S.picks.forEach(function (k, i) { badges[k] = String(i + 1); });
      if (S.mode === "pkgs" && !S.plan && PKG[S.pkg]) {
        PKG[S.pkg].days.forEach(function (d, i) {
          var at = d.stops[0] || (d.night && d.night !== "yerevan" ? d.night : null);
          if (at) badges[at] = badges[at] ? badges[at] + "·" + (i + 1) : String(i + 1);
          if (d.night && d.night !== "yerevan") beds[d.night] = 1;
        });
      }
      var sides = placeLabels(nodes);
      nodes.forEach(function (n) {
        var b = badges[n.k]; if (b && b.length > 3) b = b.split("·")[0] + "+";
        drawPin(R.pins, n, { label: true, interactive: true, badge: b, bed: beds[n.k], side: sides[n.k], labelLayer: R.labels });
      });
      drawHub(cityWalk);
      R.hint.textContent = S.plan ? L.hintPlan : S.mode === "pkgs" ? L.hintPkgs : L.hintTours;
    }

    /* panel */
    function chip(label, pressed, onClick) {
      var b = document.createElement("button"); b.type = "button"; b.className = "rm-chip"; b.setAttribute("aria-pressed", String(pressed));
      b.innerHTML = label; b.addEventListener("click", onClick); return b;
    }
    function buildChips() {
      R.themes.innerHTML = ""; R.lens.innerHTML = "";
      L.themes.forEach(function (t) {
        var n = t[0] === "all" ? TOURS.length : TOURS.filter(function (x) { return x.themes.indexOf(t[0]) >= 0; }).length;
        R.themes.appendChild(chip(esc(t[1]) + '<span class="n">' + n + "</span>", S.theme === t[0], function () { S.theme = t[0]; refresh(); }));
      });
      L.lengths.forEach(function (l) { R.lens.appendChild(chip(esc(l[1]), S.len === l[0], function () { S.len = l[0]; refresh(); })); });
      R.filters.hidden = !OPT.filters || S.mode !== "tours" || S.plan;
    }
    function buildPanel() {
      var panel = R.panel; panel.innerHTML = ""; panel.classList.remove("h");
      R.tabPkgs.hidden = !OPT.packages || !PACKAGES.length;
      R.planBtn.hidden = !OPT.planner;
      R.planBtn.setAttribute("aria-pressed", String(S.plan));
      R.planBtn.textContent = S.plan ? L.back : L.plan;
      R.tabTours.setAttribute("aria-selected", String(S.mode === "tours" && !S.plan));
      R.tabPkgs.setAttribute("aria-selected", String(S.mode === "pkgs" && !S.plan));

      if (S.plan) {
        var names = S.picks.map(function (k) { return PLACES[k].name; });
        var text = names.length ? L.msgHead + "\n" + names.map(function (n, i) { return (i + 1) + ". " + n; }).join("\n") + "\n" + L.msgFoot : L.pickOne;
        var w = document.createElement("div"); w.className = "rm-planner";
        w.innerHTML = "<p>" + esc(L.planIntro) + "</p>" +
          (S.picks.length ? '<ol class="rm-picks">' + S.picks.map(function (k, i) {
            return '<li><span class="num">' + (i + 1) + "</span><span>" + esc(PLACES[k].name) + '</span><button type="button" data-rm="' + k + '" aria-label="' + esc(L.remove + " " + PLACES[k].name) + '">×</button></li>';
          }).join("") + "</ol>" : '<p class="rm-empty">' + esc(L.planEmpty) + "</p>") +
          '<div class="rm-msg"><div class="rm-msg-label">' + esc(L.msgLabel) + "</div>" + esc(text) + "</div>" +
          '<a class="rm-btn" target="_blank" rel="noopener" href="' + esc(names.length && opts.wa ? opts.wa(text) : "#") + '"' + (names.length ? "" : ' aria-disabled="true" tabindex="-1"') + ">" + esc(L.ask) + "</a>";
        panel.appendChild(w);
        w.querySelectorAll("[data-rm]").forEach(function (b) { b.addEventListener("click", function () { togglePick(b.getAttribute("data-rm")); }); });
        return;
      }

      if (S.mode === "pkgs") {
        var pick = document.createElement("div"); pick.className = "rm-pkgs";
        PACKAGES.forEach(function (p) {
          var b = document.createElement("button"); b.type = "button"; b.className = "rm-pkg"; b.setAttribute("aria-pressed", String(S.pkg === p.id));
          b.innerHTML = '<img alt="" loading="lazy" src="' + esc(p.photo) + '"><small>' + esc(p.dur) + "</small><span>" + esc(p.title) + "</span>";
          b.addEventListener("click", function () { S.pkg = p.id; S.hoverDay = null; S.intro = true; refresh(); });
          pick.appendChild(b);
        });
        panel.appendChild(pick);
        var pkg = PKG[S.pkg];
        pkg.days.forEach(function (d, i) {
          var row = document.createElement("div"); row.className = "rm-day"; row.tabIndex = 0;
          var night = !d.end && d.night ? '<span class="rm-night">' + BED_SVG + esc(L.overnight + PLACES[d.night].name) + "</span>" : "";
          row.innerHTML = '<span class="rm-day-n">' + (i + 1) + '</span><span><span class="rm-day-t">' + esc(d.title || L.day + " " + (i + 1)) + "</span>" + night + "</span>";
          function on() { S.hoverDay = i; S.intro = false; row.classList.add("hl"); updateHighlight(); }
          function off() { S.hoverDay = null; row.classList.remove("hl"); updateHighlight(); }
          row.addEventListener("mouseenter", on); row.addEventListener("mouseleave", off);
          row.addEventListener("focus", on); row.addEventListener("blur", off);
          panel.appendChild(row);
        });
        if (pkg.nightsUnknown) { var note = document.createElement("p"); note.className = "rm-note"; note.textContent = L.nightsUnknown; panel.appendChild(note); }
        if (opts.openPackage) {
          var ob = document.createElement("button"); ob.type = "button"; ob.className = "rm-btn rm-pkg-open"; ob.textContent = L.itinerary;
          ob.addEventListener("click", function () { opts.openPackage(pkg.id); });
          panel.appendChild(ob);
        }
        return;
      }

      var list = visibleTours();
      if (!list.length) { panel.innerHTML = '<p class="rm-empty">' + esc(L.none) + "</p>"; return; }
      if (window.matchMedia("(max-width: 880px)").matches) panel.classList.add("h");
      list.forEach(function (t) {
        var item = document.createElement("div"); item.className = "rm-item" + (S.tour === t.id ? " sel" : ""); item.setAttribute("data-id", t.id);
        var season = OPT.seasons ? seasonOf(t) : null;
        var chain = t.stops.length ? [PLACES.yerevan.name].concat(t.stops.map(function (k) { return PLACES[k].name; })).map(esc).join(" <b>→</b> ") : esc(L.cityWalk);
        item.innerHTML = '<button type="button" class="rm-main"><img class="rm-thumb" alt="" loading="lazy" src="' + esc(t.thumb) + '"><span><span class="rm-title">' + esc(t.title) +
          '</span><span class="rm-meta">' + esc(t.dur) + (season ? '<span class="rm-pill">' + esc(L.best + season) + "</span>" : "") + "</span></span></button>" +
          (S.tour === t.id ? '<div class="rm-more"><span class="rm-chain">' + chain + '</span><button type="button" class="rm-btn" data-itin="1">' + esc(L.itinerary) + "</button></div>" : "");
        item.addEventListener("mouseenter", function () { setHoverTour(t.id); });
        item.addEventListener("mouseleave", function () { setHoverTour(null); });
        var main = item.querySelector(".rm-main");
        main.addEventListener("focus", function () { setHoverTour(t.id); });
        main.addEventListener("blur", function () { setHoverTour(null); });
        main.addEventListener("click", function () { selectTour(t.id); });
        var itin = item.querySelector("[data-itin]");
        if (itin) itin.addEventListener("click", function () { if (opts.openTour) opts.openTour(t.id); });
        panel.appendChild(item);
      });
      /* in the swipeable row, bring the selected tour to the middle so the card matches the route */
      var sel = panel.classList.contains("h") && panel.querySelector(".rm-item.sel");
      if (sel) {
        var pr = panel.getBoundingClientRect(), sr = sel.getBoundingClientRect();
        panel.scrollLeft += (sr.left + sr.width / 2) - (pr.left + panel.clientWidth / 2);
      }
    }

    /* place card */
    function buildCard() {
      var c = R.card;
      if (!S.card) { c.hidden = true; return; }
      var p = PLACES[S.card];
      var tours = TOURS.filter(function (t) { return t.stops.indexOf(p.key) >= 0 || (p.key === "yerevan" && !t.stops.length); });
      var pk = PACKAGES.filter(function (x) { return x.days.some(function (d) { return d.stops.indexOf(p.key) >= 0 || d.night === p.key; }); });
      var badges = "";
      if (OPT.times && p.time) badges += '<span class="rm-pill warm">≈ ' + esc(p.time + L.fromYerevan) + "</span>";
      if (OPT.seasons && p.season) badges += '<span class="rm-pill">' + esc(L.best + p.season[lang === "ru" ? 1 : 0]) + "</span>";
      if (OPT.ararat && p.ararat) badges += '<span class="rm-pill warm">' + esc(L.araratView) + "</span>";
      var credit = p.photo ? PHOTO_CREDITS[p.photo] : "";
      c.innerHTML = '<button type="button" class="rm-x" aria-label="' + esc(L.close) + '">×</button>' +
        (p.img ? '<img alt="" src="' + esc(p.img) + '">' : "") +
        '<div class="rm-card-body"><div class="rm-card-name">' + esc(p.name) + '</div><div class="rm-card-blurb">' + esc(p.blurb) + "</div>" +
        (badges ? '<div class="rm-badges">' + badges + "</div>" : "") +
        (tours.length ? '<div class="rm-card-h">' + esc(p.key === "yerevan" ? L.cityTours : L.onTours) + '</div><div class="rm-links">' +
          tours.map(function (t) { return '<button type="button" data-tour="' + t.id + '">' + esc(t.title) + "</button>"; }).join("") + "</div>" : "") +
        (OPT.packages && pk.length && p.key !== "yerevan" ? '<div class="rm-card-h">' + esc(L.inPackages) + '</div><div class="rm-links">' +
          pk.map(function (x) { return '<button type="button" data-pkg="' + x.id + '">' + esc(x.title) + "</button>"; }).join("") + "</div>" : "") +
        (credit ? '<div class="rm-credit">' + esc(L.photo + credit) + "</div>" : "") + "</div>";
      c.className = "rm-card" + (p.img ? "" : " no-photo");
      c.hidden = false;
      c.querySelector(".rm-x").addEventListener("click", function () { S.card = null; buildCard(); });
      c.querySelectorAll("[data-tour]").forEach(function (b) { b.addEventListener("click", function () { S.plan = false; S.mode = "tours"; S.theme = "all"; S.len = "any"; selectTour(b.getAttribute("data-tour"), true); }); });
      c.querySelectorAll("[data-pkg]").forEach(function (b) { b.addEventListener("click", function () { S.plan = false; S.mode = "pkgs"; S.pkg = b.getAttribute("data-pkg"); S.hoverDay = null; S.intro = true; refresh(); }); });
    }

    /* actions */
    function setHoverTour(id) { if (S.mode !== "tours" || S.plan) return; S.hoverTour = id; updateHighlight(); }
    function selectTour(id, keepCard) { S.tour = id; S.hoverTour = null; if (!keepCard) S.card = lastStop(id); refresh(); }
    function togglePick(k) {
      var i = S.picks.indexOf(k);
      if (i >= 0) S.picks.splice(i, 1); else if (S.picks.length < 5) S.picks.push(k); else toast(L.limit);
      buildPanel(); updateHighlight();
    }
    function placeClicked(k) { if (S.plan) { if (k !== "yerevan") togglePick(k); return; } S.card = k; buildCard(); }
    function refresh() {
      if (!OPT.packages && S.mode === "pkgs") S.mode = "tours";
      if (!OPT.planner) S.plan = false;
      buildChips(); drawDots(); drawRoutes(); lastActiveKey = null; updateHighlight(); buildPanel(); buildCard();
    }

    R.tabTours.addEventListener("click", function () { S.plan = false; S.mode = "tours"; refresh(); });
    R.tabPkgs.addEventListener("click", function () { S.plan = false; S.mode = "pkgs"; S.hoverDay = null; S.intro = true; refresh(); });
    R.planBtn.addEventListener("click", function () { S.plan = !S.plan; S.card = null; refresh(); });

    /* the tour list turns into a swipeable row on narrow screens */
    var narrow = window.matchMedia("(max-width: 880px)");
    if (narrow.addEventListener) narrow.addEventListener("change", buildPanel);

    /* phones: swiping the tour row selects the card in the middle */
    var swipeTimer = null;
    R.panel.addEventListener("scroll", function () {
      var panel = R.panel;
      if (!panel.classList.contains("h")) return;
      clearTimeout(swipeTimer);
      swipeTimer = setTimeout(function () {
        var mid = panel.getBoundingClientRect().left + panel.clientWidth / 2, best = null, bestD = 1e9;
        panel.querySelectorAll(".rm-item").forEach(function (it) { var r = it.getBoundingClientRect(), d = Math.abs(r.left + r.width / 2 - mid); if (d < bestD) { bestD = d; best = it; } });
        if (best && best.getAttribute("data-id") !== S.tour) {
          S.tour = best.getAttribute("data-id");
          panel.querySelectorAll(".rm-item").forEach(function (it) { it.classList.toggle("sel", it === best); });
          S.card = lastStop(S.tour); updateHighlight(); buildCard();
        }
      }, 140);
    });

    refresh();

    /* redraw the selected route the first time the map scrolls into view, so the animation is seen */
    if (!reduce && "IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        if (entries.some(function (e) { return e.isIntersecting; })) { io.disconnect(); lastActiveKey = null; updateHighlight(); }
      }, { threshold: 0.35 });
      io.observe(svg);
    }
  }

  window.ArminaRouteMap = { mount: mount };
})();
