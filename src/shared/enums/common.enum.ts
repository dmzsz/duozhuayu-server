import { registerEnumType } from '@nestjs/graphql';

/**
 * 国家代码 ISO_3166-1
 */
export enum CountryCodes {
    /**
     * 阿富汗	
     */
    AFG = "AFG",
    /**
     * 阿尔巴尼亚	
     */
    ALB = "ALB",
    /**
     * 阿尔及利亚	
     */
    DZA = "DZA",
    /**
     * 美属萨摩亚	
     */
    ASM = "ASM",
    /**
     * 安道尔	
     */
    AND = "AND",
    /**
     * 安哥拉	
     */
    AGO = "AGO",
    /**
     * 安圭拉	
     */
    AIA = "AIA",
    /**
     * 南极洲	
     */
    ATA = "ATA",
    /**
     * 安提瓜和巴布达	
     */
    ATG = "ATG",
    /**
     * 阿根廷	
     */
    ARG = "ARG",
    /**
     * 亚美尼亚	
     */
    ARM = "ARM",
    /**
     * 阿鲁巴	
     */
    ABW = "ABW",
    /**
     * 澳大利亚	
     */
    AUS = "AUS",
    /**
     * 奥地利	
     */
    AUT = "AUT",
    /**
     * 阿塞拜疆	
     */
    AZE = "AZE",
    /**
     * 巴哈马	
     */
    BHS = "BHS",
    /**
     * 巴林	
     */
    BHR = "BHR",
    /**
     * 孟加拉国	
     */
    BGD = "BGD",
    /**
     * 巴巴多斯	
     */
    BRB = "BRB",
    /**
     * 白俄罗斯	
     */
    BLR = "BLR",
    /**
     * 比利时	
     */
    BEL = "BEL",
    /**
     * 伯利兹	
     */
    BLZ = "BLZ",
    /**
     * 贝宁	
     */
    BEN = "BEN",
    /**
     * 百慕大	
     */
    BMU = "BMU",
    /**
     * 不丹	
     */
    BTN = "BTN",
    /**
     * 玻利维亚	
     */
    BOL = "BOL",
    /**
     * 波黑	
     */
    BIH = "BIH",
    /**
     * 博茨瓦纳	
     */
    BWA = "BWA",
    /**
     * 布韦岛	
     */
    BVT = "BVT",
    /**
     * 巴西	
     */
    BRA = "BRA",
    /**
     * 英属印度洋领地	
     */
    IOT = "IOT",
    /**
     * 英属维尔京群岛	
     */
    VGB = "VGB",
    /**
     * 汶莱	
     */
    BRN = "BRN",
    /**
     * 保加利亚	
     */
    BGR = "BGR",
    /**
     * 布基纳法索	
     */
    BFA = "BFA",
    /**
     * 缅甸	
     */
    MMR = "MMR",
    /**
     * 布隆迪	
     */
    BDI = "BDI",
    /**
     * 佛得角	
     */
    CPV = "CPV",
    /**
     * 柬埔寨	
     */
    KHM = "KHM",
    /**
     * 喀麦隆	
     */
    CMR = "CMR",
    /**
     * 加拿大	
     */
    CAN = "CAN",
    /**
     * 开曼群岛	
     */
    CYM = "CYM",
    /**
     * 中非	
     */
    CAF = "CAF",
    /**
     * 乍得	
     */
    TCD = "TCD",
    /**
     * 智利	
     */
    CHL = "CHL",
    /**
     * 中国	
     */
    CHN = "CHN",
    /**
     * 圣诞岛	
     */
    CXR = "CXR",
    /**
     * 科科斯（基林）群岛	
     */
    CCK = "CCK",
    /**
     * 哥伦比亚	
     */
    COL = "COL",
    /**
     * 科摩罗	
     */
    COM = "COM",
    /**
     * 刚果民主共和国	
     */
    COD = "COD",
    /**
     * 刚果共和国	
     */
    COG = "COG",
    /**
     * 库克群岛	
     */
    COK = "COK",
    /**
     * 哥斯达黎加	
     */
    CRI = "CRI",
    /**
     * 象牙海岸	
     */
    CIV = "CIV",
    /**
     * 克罗地亚	
     */
    HRV = "HRV",
    /**
     * 古巴	
     */
    CUB = "CUB",
    /**
     * 库拉索	
     */
    CUW = "CUW",
    /**
     * 塞浦路斯	
     */
    CYP = "CYP",
    /**
     * 捷克	
     */
    CZE = "CZE",
    /**
     * 丹麦	
     */
    DNK = "DNK",
    /**
     * 吉布提	
     */
    DJI = "DJI",
    /**
     * 多米尼克	
     */
    DMA = "DMA",
    /**
     * 多米尼加	
     */
    DOM = "DOM",
    /**
     * 厄瓜多尔	
     */
    ECU = "ECU",
    /**
     * 埃及	
     */
    EGY = "EGY",
    /**
     * 萨尔瓦多	
     */
    SLV = "SLV",
    /**
     * 赤道几内亚	
     */
    GNQ = "GNQ",
    /**
     * 厄立特里亚	
     */
    ERI = "ERI",
    /**
     * 爱沙尼亚	
     */
    EST = "EST",
    /**
     * 埃塞俄比亚	
     */
    ETH = "ETH",
    /**
     * 福克兰群岛	
     */
    FLK = "FLK",
    /**
     * 法罗群岛	
     */
    FRO = "FRO",
    /**
     * 斐济	
     */
    FJI = "FJI",
    /**
     * 芬兰	
     */
    FIN = "FIN",
    /**
     * 法国	
     */
    FRA = "FRA",
    /**
     * 法国本土	
     */
    FXX = "FXX",
    /**
     * 法属圭亚那	
     */
    GUF = "GUF",
    /**
     * 法属波利尼西亚	
     */
    PYF = "PYF",
    /**
     * 法属南部和南极领地	
     */
    ATF = "ATF",
    /**
     * 加蓬	
     */
    GAB = "GAB",
    /**
     * 冈比亚	
     */
    GMB = "GMB",
    /**
     * 巴勒斯坦	
     */
    PSE = "PSE",
    /**
     * 格鲁吉亚	
     */
    GEO = "GEO",
    /**
     * 德国	
     */
    DEU = "DEU",
    /**
     * 加纳	
     */
    GHA = "GHA",
    /**
     * 直布罗陀	
     */
    GIB = "GIB",
    /**
     * 希腊	
     */
    GRC = "GRC",
    /**
     * 格陵兰	
     */
    GRL = "GRL",
    /**
     * 格林纳达	
     */
    GRD = "GRD",
    /**
     * 瓜德罗普	
     */
    GLP = "GLP",
    /**
     * 关岛	
     */
    GUM = "GUM",
    /**
     * 危地马拉	
     */
    GTM = "GTM",
    /**
     * 根西	
     */
    GGY = "GGY",
    /**
     * 几内亚	
     */
    GIN = "GIN",
    /**
     * 几内亚比绍	
     */
    GNB = "GNB",
    /**
     * 圭亚那	
     */
    GUY = "GUY",
    /**
     * 海地	
     */
    HTI = "HTI",
    /**
     * 赫德岛和麦克唐纳群岛	
     */
    HMD = "HMD",
    /**
     * 梵蒂冈	
     */
    VAT = "VAT",
    /**
     * 洪都拉斯	
     */
    HND = "HND",
    /**
     * 香港	
     */
    HKG = "HKG",
    /**
     * 匈牙利	
     */
    HUN = "HUN",
    /**
     * 冰岛	
     */
    ISL = "ISL",
    /**
     * 印度	
     */
    IND = "IND",
    /**
     * 印尼	
     */
    IDN = "IDN",
    /**
     * 伊朗	
     */
    IRN = "IRN",
    /**
     * 伊拉克	
     */
    IRQ = "IRQ",
    /**
     * 爱尔兰	
     */
    IRL = "IRL",
    /**
     * 马恩岛	
     */
    IMN = "IMN",
    /**
     * 以色列	
     */
    ISR = "ISR",
    /**
     * 意大利	
     */
    ITA = "ITA",
    /**
     * 牙买加	
     */
    JAM = "JAM",
    /**
     * 日本	
     */
    JPN = "JPN",
    /**
     * 泽西	
     */
    JEY = "JEY",
    /**
     * 约旦	
     */
    JOR = "JOR",
    /**
     * 哈萨克斯坦	
     */
    KAZ = "KAZ",
    /**
     * 肯尼亚	
     */
    KEN = "KEN",
    /**
     * 基里巴斯	
     */
    KIR = "KIR",
    /**
     * 北韩	
     */
    PRK = "PRK",
    /**
     * 南韩	
     */
    KOR = "KOR",
    /**
     * 科索沃	
     */
    XKS = "XKS",
    /**
     * 科威特	
     */
    KWT = "KWT",
    /**
     * 吉尔吉斯斯坦	
     */
    KGZ = "KGZ",
    /**
     * 寮国	
     */
    LAO = "LAO",
    /**
     * 拉脱维亚	
     */
    LVA = "LVA",
    /**
     * 黎巴嫩	
     */
    LBN = "LBN",
    /**
     * 莱索托	
     */
    LSO = "LSO",
    /**
     * 利比里亚	
     */
    LBR = "LBR",
    /**
     * 利比亚	
     */
    LBY = "LBY",
    /**
     * 列支敦士登	
     */
    LIE = "LIE",
    /**
     * 立陶宛	
     */
    LTU = "LTU",
    /**
     * 卢森堡	
     */
    LUX = "LUX",
    /**
     * 澳门	
     */
    MAC = "MAC",
    /**
     * 北马其顿	
     */
    MKD = "MKD",
    /**
     * 马达加斯加	
     */
    MDG = "MDG",
    /**
     * 马拉维	
     */
    MWI = "MWI",
    /**
     * 马来西亚	
     */
    MYS = "MYS",
    /**
     * 马尔代夫	
     */
    MDV = "MDV",
    /**
     * 马里	
     */
    MLI = "MLI",
    /**
     * 马耳他	
     */
    MLT = "MLT",
    /**
     * 马绍尔群岛	
     */
    MHL = "MHL",
    /**
     * 马提尼克	
     */
    MTQ = "MTQ",
    /**
     * 毛里塔尼亚	
     */
    MRT = "MRT",
    /**
     * 毛里求斯	
     */
    MUS = "MUS",
    /**
     * 马约特	
     */
    MYT = "MYT",
    /**
     * 墨西哥	
     */
    MEX = "MEX",
    /**
     * 密克罗尼西亚联邦	
     */
    FSM = "FSM",
    /**
     * 摩尔多瓦	
     */
    MDA = "MDA",
    /**
     * 摩纳哥	
     */
    MCO = "MCO",
    /**
     * 蒙古	
     */
    MNG = "MNG",
    /**
     * 黑山	
     */
    MNE = "MNE",
    /**
     * 蒙特塞拉特	
     */
    MSR = "MSR",
    /**
     * 摩洛哥	
     */
    MAR = "MAR",
    /**
     * 莫桑比克	
     */
    MOZ = "MOZ",
    /**
     * 那米比亚	
     */
    NAM = "NAM",
    /**
     * 瑙鲁	
     */
    NRU = "NRU",
    /**
     * 尼泊尔	
     */
    NPL = "NPL",
    /**
     * 荷兰	
     */
    NLD = "NLD",
    /**
     * 荷属安的列斯	
     */
    ANT = "ANT",
    /**
     * 新喀里多尼亚	
     */
    NCL = "NCL",
    /**
     * 新西兰	
     */
    NZL = "NZL",
    /**
     * 尼加拉瓜	
     */
    NIC = "NIC",
    /**
     * 尼日尔	
     */
    NER = "NER",
    /**
     * 尼日利亚	
     */
    NGA = "NGA",
    /**
     * 纽埃	
     */
    NIU = "NIU",
    /**
     * 诺福克岛	
     */
    NFK = "NFK",
    /**
     * 北马里亚纳群岛	
     */
    MNP = "MNP",
    /**
     * 挪威	
     */
    NOR = "NOR",
    /**
     * 阿曼	
     */
    OMN = "OMN",
    /**
     * 巴基斯坦	
     */
    PAK = "PAK",
    /**
     * 帕劳	
     */
    PLW = "PLW",
    /**
     * 巴拿马	
     */
    PAN = "PAN",
    /**
     * 巴布亚新几内亚	
     */
    PNG = "PNG",
    /**
     * 巴拉圭	
     */
    PRY = "PRY",
    /**
     * 秘鲁	
     */
    PER = "PER",
    /**
     * 菲律宾	
     */
    PHL = "PHL",
    /**
     * 皮特凯恩群岛	
     */
    PCN = "PCN",
    /**
     * 波兰	
     */
    POL = "POL",
    /**
     * 葡萄牙	
     */
    PRT = "PRT",
    /**
     * 波多黎各	
     */
    PRI = "PRI",
    /**
     * 卡塔尔	
     */
    QAT = "QAT",
    /**
     * 留尼汪	
     */
    REU = "REU",
    /**
     * 罗马尼亚	
     */
    ROU = "ROU",
    /**
     * 台湾	
     */
    TWN = "TWN",
    /**
     * 俄罗斯	
     */
    RUS = "RUS",
    /**
     * 卢旺达	
     */
    RWA = "RWA",
    /**
     * 圣巴泰勒米	
     */
    BLM = "BLM",
    /**
     * 圣赫勒拿、阿森松和特里斯坦-达库尼亚	
     */
    SHN = "SHN",
    /**
     * 圣基茨和尼维斯	
     */
    KNA = "KNA",
    /**
     * 圣卢西亚	
     */
    LCA = "LCA",
    /**
     * 法属圣马丁	
     */
    MAF = "MAF",
    /**
     * 圣文森特和格林纳丁斯	
     */
    VCT = "VCT",
    /**
     * 萨摩亚	
     */
    WSM = "WSM",
    /**
     * 圣马力诺	
     */
    SMR = "SMR",
    /**
     * 圣多美和普林西比	
     */
    STP = "STP",
    /**
     * 沙特阿拉伯	
     */
    SAU = "SAU",
    /**
     * 塞内加尔	
     */
    SEN = "SEN",
    /**
     * 塞尔维亚	
     */
    SRB = "SRB",
    /**
     * 塞舌尔	
     */
    SYC = "SYC",
    /**
     * 塞拉利昂	
     */
    SLE = "SLE",
    /**
     * 新加坡	
     */
    SGP = "SGP",
    /**
     * 荷属圣马丁	
     */
    SXM = "SXM",
    /**
     * 斯洛伐克	
     */
    SVK = "SVK",
    /**
     * 斯洛文尼亚	
     */
    SVN = "SVN",
    /**
     * 所罗门群岛	
     */
    SLB = "SLB",
    /**
     * 索马里	
     */
    SOM = "SOM",
    /**
     * 南非	
     */
    ZAF = "ZAF",
    /**
     * 南乔治亚和南桑威奇群岛	
     */
    SGS = "SGS",
    /**
     * 南苏丹	
     */
    SSD = "SSD",
    /**
     * 西班牙	
     */
    ESP = "ESP",
    /**
     * 斯里兰卡	
     */
    LKA = "LKA",
    /**
     * 苏丹	
     */
    SDN = "SDN",
    /**
     * 苏里南	
     */
    SUR = "SUR",
    /**
     * 圣皮埃尔和密克隆	
     */
    SPM = "SPM",
    /**
     * 斯威士兰	
     */
    SWZ = "SWZ",
    /**
     * 瑞典	
     */
    SWE = "SWE",
    /**
     * 瑞士	
     */
    CHE = "CHE",
    /**
     * 叙利亚	
     */
    SYR = "SYR",
    /**
     * 塔吉克斯坦	
     */
    TJK = "TJK",
    /**
     * 坦桑尼亚	
     */
    TZA = "TZA",
    /**
     * 泰国	
     */
    THA = "THA",
    /**
     * 东帝汶	
     */
    TLS = "TLS",
    /**
     * 多哥	
     */
    TGO = "TGO",
    /**
     * 托克劳	
     */
    TKL = "TKL",
    /**
     * 汤加	
     */
    TON = "TON",
    /**
     * 特立尼达和多巴哥	
     */
    TTO = "TTO",
    /**
     * 突尼斯	
     */
    TUN = "TUN",
    /**
     * 土耳其	
     */
    TUR = "TUR",
    /**
     * 土库曼斯坦	
     */
    TKM = "TKM",
    /**
     * 特克斯和凯科斯群岛	
     */
    TCA = "TCA",
    /**
     * 图瓦卢	
     */
    TUV = "TUV",
    /**
     * 乌干达	
     */
    UGA = "UGA",
    /**
     * 乌克兰	
     */
    UKR = "UKR",
    /**
     * 阿联酋	
     */
    ARE = "ARE",
    /**
     * 英国	
     */
    GBR = "GBR",
    /**
     * 美国	
     */
    USA = "USA",
    /**
     * 美国本土外小岛屿	
     */
    UMI = "UMI",
    /**
     * 乌拉圭	
     */
    URY = "URY",
    /**
     * 乌兹别克斯坦	
     */
    UZB = "UZB",
    /**
     * 瓦努阿图	
     */
    VUT = "VUT",
    /**
     * 委内瑞拉	
     */
    VEN = "VEN",
    /**
     * 越南	
     */
    VNM = "VNM",
    /**
     * 美属维尔京群岛	
     */
    VIR = "VIR",
    /**
     * 瓦利斯和富图纳	
     */
    WLF = "WLF",
    /**
     * 西撒哈拉	
     */
    ESH = "ESH",
    /**
     * 联合国	
     */
    UNO = "UNO",
    /**
     * 欧洲联盟	
     */
    EUE = "EUE",
    /**
     * 也门	
     */
    YEM = "YEM",
    /**
     * 扎伊尔	
     */
    ZAI = "ZAI",
    /**
     * 赞比亚	
     */
    ZMB = "ZMB",
    /**
     * 津巴布韦	
     */
    ZWE = "ZWE",
    /**
     * 罗得西亚	
     */
    RHO = "RHO",
    /**
     * 西印度群岛联邦	
     */
    WIF = "WIF",
    /**
     * 独立国家联合体	
     */
    EUN = "EUN",
    /**
     * 澳大拉西亚	
     */
    ANZ = "ANZ",
    /**
     * 南斯拉夫	
     */
    YUG = "YUG",
    /**
     * 苏联	
     */
    URS = "URS",
    /**
     * 达荷美	
     */
    DAH = "DAH",
    /**
     * 上沃尔特	
     */
    VOL = "VOL",
    /**
     * 波希米亚	
     */
    BOH = "BOH",
    /**
     * 捷克斯洛伐克	
     */
    TCH = "TCH",
    /**
     * 阿拉伯联合共和国	
     */
    UAR = "UAR",
    /**
     * 塞尔维亚和黑山	
     */
    SCG = "SCG",
}
/**
 * 国家货币代码
 */
export enum CurrencyCode {
    /**
     * 港币
     */
    HKD = "HKD",
    /**
     * 印度尼西亚卢比 印尼盾
     */
    IDR = "IDR",
    /**
     * 巴基斯坦卢比
     */
    PKR = "PKR",
    /**
     * 印度卢比 不丹卢比
     */
    "PKR_Rs" = "PKR_₨",
    /**
     * 日本元 日元
     */
    JPY = "JPY",
    /**
     * 澳门元
     */
    MOP = "MOP",
    /**
     * 马来西亚 林吉特或叫令吉
     */
    MYR = "MYR",
    /**
     * 菲律宾比索
     */
    PHP = "PHP",
    /**
     * 新加坡元
     */
    SGD = "SGD",
    /**
     * 韩元
     */
    KRW = "KRW",
    /**
     * 泰銖
     */
    THB = "THB",
    /**
     * 人民币
     */
    CNY = "CNY",
    /**
     * 新台币
     */
    TWD = "TWD",
    /**
     * 欧元
     */
    EUR = "EUR",
    /**
     * 丹麦克朗
     */
    DKK = "DKK",
    /**
     * 英镑
     */
    GBP = "GBP",
    /**
     * 挪威克朗
     */
    NOK = "NOK",
    /**
     * 瑞典克朗
     */
    SEK = "SEK",
    /**
     * 瑞士法郎
     */
    CHF = "CHF",
    /**
     * 俄罗斯卢布
     */
    RUB = "RUB",
    /**
     * 加拿大元
     */
    CAD = "CAD",
    /**
     * 美元
     */
    USD = "USD",
    /**
     * 澳元
     */
    AUD = "AUD",
    /**
     * 新西兰元
     */
    NZD = "NZD",
    /**
     * 越南盾
     */
    VND = "VND",
}

/**
 * 货币符号
 */
export enum CurrencySymbol {
    /**
     * 港元
     */
    "HKD_$" = "HKD_$",
    /**
     * 印尼盾
     */
    "IDR_₨" = "IDR_₨",
    /**
     * 印度卢比 不丹卢比
     */
    "INR_₨" = "INR_₨",
    /**
     * 印度卢比 不丹卢比
     */
    "PKR_₨" = "PKR_₨",
    /**
     * 日元
     */
    "JPY_¥" = "JPY_¥",
    /**
     * 澳门元
     */
    "MOP_P" = "MOP_P",
    /**
     * 马来西亚林吉特 令吉
     */
    "MYR_RM" = "MYR_RM",
    /**
     * 菲律宾比索
     */
    "PHP_₱" = "PHP_₱",
    /**
     * 新加坡元
     */
    "SGD_$" = "SGD_$",
    /**
     * 韩元
     */
    "KRW_₩" = "KRW_₩",
    /**
     *  泰銖
     */
    "THB_฿" = "THB_฿",
    /**
     * 人民币
     */
    "CNY_¥" = "CNY_¥",
    /**
     * 新台币
     */
    "TWD_$" = "TWD_$",
    /**
     * 欧元
     */
    "EUR_€" = "EUR_€",
    /**
     * 丹麦克朗
     */
    "DKK_Kr" = "DKK_Kr",
    /**
     * 英镑
     */
    "GBP_£" = "GBP_£",
    /**
     * 挪威克朗
     */
    "NOK_kr" = "NOK_kr",
    /**
     * 瑞典克朗
     */
    "SEK_kr" = "SEK_kr",
    /**
     * 瑞士法郎
     */
    "CHF_Fr" = "CHF_Fr",
    /**
     * 俄罗斯卢布
     */
    "RUB_₽" = "RUB_₽",
    /**
     * 加拿大元
     */
    "CAD_$" = "CAD_$",
    /**
     *  美元
     */
    "USD_$" = "USD_$",
    /**
    *  澳元
    */
    "AUD_$" = "AUD_$",
    /**
     * 新西兰元
     */
    "NZD_$" = "NZD_$",
    /**
     * 越南盾
     */
    "VND_₫" = "VND_₫",
}

export enum FirstLetter {
    A=0, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z,
}

registerEnumType(CountryCodes, {
    name: 'CountryCodes'
})
registerEnumType(CurrencyCode, {
    name: 'CurrencyCode'
})
registerEnumType(FirstLetter, {
    name: 'FirstLetter'
})