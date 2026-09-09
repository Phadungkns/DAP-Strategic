import type { DongFundaContent, ContentSeries, ContentBlock } from './model';
import { clipPreview } from './clip-preview';

const reading: ContentSeries = {
  _id: 'demo-reading',
  title: 'อ่านธุรกิจผ่านงบ',
  slug: 'read-the-business',
  description: 'เจาะตัวเลข เข้าใจธุรกิจ เห็นโอกาสก่อนใคร',
};
const slowly: ContentSeries = {
  _id: 'demo-slowly',
  title: 'รวย...ช้าไม่เป็นไร',
  slug: 'grow-patiently',
  description: 'การลงทุนระยะยาว สร้างความมั่งคั่งอย่างยั่งยืน',
};
const beginner: ContentSeries = {
  _id: 'demo-beginner',
  title: 'มือใหม่ไม่เคยเห็น',
  slug: 'first-principles',
  description: 'พื้นฐานการลงทุน ที่โรงเรียนไม่ได้สอน',
};

const hospitalContext: ContentBlock[] = [
  {
    _key: 'hospital-big-picture',
    kind: 'text',
    heading: 'มองภาพใหญ่ของธุรกิจโรงพยาบาล',
    text: 'ประเทศไทยมีผู้สูงอายุเป็นสัดส่วนสำคัญของประชากรแล้ว ผลสำรวจประชากรสูงอายุของสำนักงานสถิติแห่งชาติปี 2567 พบว่า ผู้มีอายุ 60 ปีขึ้นไปคิดเป็น 20.0% ของประชากร หรือประมาณหนึ่งในห้า เทียบกับ 6.8% ในปี 2537 การเปลี่ยนแปลงนี้เป็นบริบทระยะยาวที่ควรนำมาพิจารณาเมื่ออ่านธุรกิจบริการสุขภาพ ไม่ใช่อาศัยเพียงจำนวนผู้ป่วยในปีใดปีหนึ่ง',
    source: 'สำนักงานสถิติแห่งชาติ: การสำรวจประชากรสูงอายุ พ.ศ. 2567 หน้า 1',
    url: 'https://www.nso.go.th/nsoweb/storage/survey_detail/2025/20241003145311_94190.pdf',
  },
  {
    _key: 'hospital-health-context',
    kind: 'text',
    text: 'อีกด้านหนึ่ง WHO ระบุว่าโรคไม่ติดต่อ เช่น โรคหัวใจและหลอดเลือด มะเร็ง เบาหวาน และโรคปอดเรื้อรัง เป็นสาเหตุสำคัญของการเสียชีวิตในประเทศไทย ในมุมการอ่านธุรกิจ จึงควรพิจารณาทั้งการป้องกัน การตรวจพบโรค และการดูแลต่อเนื่อง ไม่ใช่มองเฉพาะการรักษาเมื่อเจ็บป่วยรุนแรง อย่างไรก็ตาม ความจำเป็นด้านสุขภาพไม่ได้แปลว่าผู้ใช้บริการทุกกลุ่มจะเข้าถึงหรือมีกำลังจ่ายให้โรงพยาบาลเอกชนเหมือนกัน',
    source: 'WHO ประเทศไทย: Noncommunicable Diseases (สืบค้น 9 กันยายน 2569)',
    url: 'https://www.who.int/thailand/our-work/NCDs',
  },
  {
    _key: 'hospital-service-context',
    kind: 'text',
    text: 'สำหรับ BH ข้อมูลบริษัทประจำปี 2568 ระบุว่าให้บริการทั้งผู้ป่วยไทยและต่างชาติ โดยครอบคลุมโรคเฉพาะทางและภาวะซับซ้อน พร้อมพัฒนาบริการดิจิทัลและนำเทคโนโลยีทางการแพทย์มาใช้ ตัวอย่างนี้ชี้ให้เห็นประเด็นที่ควรพิจารณาเพิ่มเติมจากขนาดโรงพยาบาล ได้แก่ ความเชี่ยวชาญของทีมรักษา คุณภาพบริการ และความสามารถในการรองรับผู้ใช้บริการแต่ละกลุ่ม ทั้งนี้ ข้อมูลของ BH ไม่ใช่ตัวแทนของโรงพยาบาลทั้งอุตสาหกรรม',
    source: 'BH: Listed Company Snapshot ปี 2025 เผยแพร่ 16 มีนาคม 2026 ผ่าน SET',
    url: 'https://lssmedia.setlink.set.or.th/2025/YE/BH-YE68-ListedCompanySnapshot-EN.html',
  },
  {
    _key: 'hospital-context-conclusion',
    kind: 'text',
    text: 'ข้อสรุปเชิงตีความของ DongFunda คือ ภาพใหญ่ด้านสุขภาพเป็นจุดเริ่มต้นในการทำความเข้าใจโอกาส แต่ยังไม่ใช่หลักประกันว่ารายได้หรือกำไรจะเติบโต ต้องดูต่อว่าโรงพยาบาลเลือกให้บริการใคร มีรายได้จากบริการใด และบริหารต้นทุนกับเงินลงทุนอย่างไร จึงค่อยเชื่อมภาพใหญ่เข้ากับโมเดลธุรกิจและงบการเงินของบริษัท',
  },
];

function demo(
  slug: string,
  title: string,
  topic: string,
  series: ContentSeries,
  image: string,
  index: number,
): DongFundaContent {
  return {
    _id: `demo-${slug}`,
    content_id: `LOCAL-${index}`,
    version: 1,
    slug,
    title,
    primary_topic: topic,
    series,
    tags: [topic],
    duration_minutes: 4 + (index % 3),
    thumbnail: {
      url: `/dongfunda-demo/${image}`,
      alt: `ภาพประกอบตัวอย่าง ${title}`,
    },
    publish_status: 'draft',
    owner_approval_status: 'pending',
    demo: true,
    created_at: '2026-09-09T08:00:00Z',
    updated_at: '2026-09-09T08:00:00Z',
    summary:
      'การอ่านธุรกิจเริ่มจากคำถามที่ดี ไม่ใช่เพียงราคาหุ้น ลองพิจารณาความสัมพันธ์ระหว่างผลประกอบการ กระแสเงินสด และความสามารถในการเติบโตระยะยาว',
    key_takeaways: [
      'กำไรและเงินสดอาจเคลื่อนไหวต่างกัน จึงควรอ่านงบประกอบกัน',
      'เปรียบเทียบหลายช่วงเวลาเพื่อมองเห็นบริบทของธุรกิจ',
      'ตรวจสอบแหล่งข้อมูลและสมมติฐานก่อนสรุป',
    ],
    content_blocks: [
      ...(slug === 'bh-five-year-review' ? hospitalContext : []),
      {
        _key: 'model',
        kind: 'business_model',
        heading: 'เริ่มจากเข้าใจโมเดลธุรกิจ',
        text: 'ธุรกิจสร้างรายได้จากอะไร ลูกค้าคือใคร และอะไรทำให้ลูกค้ากลับมาใช้บริการ? คำถามเหล่านี้ช่วยให้ตัวเลขในงบการเงินมีความหมายมากขึ้น',
      },
      {
        _key: 'cash',
        kind: 'cash_flow',
        heading: 'กำไรที่เห็น กลายเป็นเงินสดหรือยัง?',
        text: 'พิจารณารายการที่ไม่ใช่เงินสด ลูกหนี้ และเงินทุนหมุนเวียน ควบคู่กับเงินลงทุนเพื่อรักษาธุรกิจและการลงทุนเพื่อเติบโต',
      },
      {
        _key: 'chart',
        kind: 'chart',
        heading: 'ตัวอย่างการอ่านแนวโน้ม',
        caption: 'ข้อมูลสมมติสำหรับทดสอบการแสดงผล ไม่ใช่ผลประกอบการของบริษัท',
        unit: 'หน่วยสมมติ',
        source: 'Local layout fixture',
        points: [
          { _key: 'a', label: 'ปี 1', value: 45 },
          { _key: 'b', label: 'ปี 2', value: 62 },
          { _key: 'c', label: 'ปี 3', value: 54 },
          { _key: 'd', label: 'ปี 4', value: 80 },
          { _key: 'e', label: 'ปี 5', value: 91 },
        ],
      },
      {
        _key: 'table',
        kind: 'financial_table',
        heading: 'คำถามที่ใช้ประกอบการอ่านงบ',
        columns: ['สิ่งที่พิจารณา', 'คำถามสำคัญ'],
        rows: [
          {
            _key: '1',
            cells: ['รายได้', 'การเติบโตมาจากราคา ปริมาณ หรือธุรกิจใหม่?'],
          },
          {
            _key: '2',
            cells: [
              'กระแสเงินสด',
              'เงินสดจากการดำเนินงานสอดคล้องกับกำไรหรือไม่?',
            ],
          },
          {
            _key: '3',
            cells: ['งบดุล', 'โครงสร้างเงินทุนรองรับแผนการเติบโตได้แค่ไหน?'],
          },
        ],
      },
      {
        _key: 'quote',
        kind: 'quote',
        text: 'ตัวเลขไม่ได้โกหก แค่เราต้องอ่านให้เป็น',
        caption: 'DONGFUNDA by DAP',
      },
      {
        _key: 'end',
        kind: 'conclusion',
        heading: 'มองธุรกิจให้ลึกกว่าราคา',
        text: 'บทความตัวอย่างนี้แสดงวิธีจัดลำดับเนื้อหาเท่านั้น ไม่ใช่งานวิจัยบริษัทหรือคำแนะนำลงทุน เนื้อหาจริงต้องผ่านการตรวจสอบและอนุมัติก่อนเผยแพร่',
      },
    ],
  };
}

export const demoContent: DongFundaContent[] = [
  clipPreview,
  {
    ...demo('bh-five-year-review', 'BH งบ 5 ปี', '5Y FS', reading, 'bh.png', 0),
    excerpt: 'กำไรโต แต่กระแสเงินสดบอกอะไรเรา?',
    tickers: ['BH'],
    companies: ['Bumrungrad', 'บำรุงราษฎร์'],
    secondary_topics: ['โรงพยาบาล', 'CFO'],
    featured: true,
    research_status: 'macro_context_sourced',
    trending_rank: 1,
    trending_source: 'demo',
  },
  {
    ...demo(
      'bdms-cash-flow',
      'BDMS CFO โตเพราะอะไร?',
      'CFO',
      reading,
      'bdms.jpg',
      1,
    ),
    excerpt: 'เจาะกระแสเงินสดของธุรกิจโรงพยาบาล',
    tickers: ['BDMS'],
    companies: ['Bangkok Dusit Medical Services'],
    secondary_topics: ['โรงพยาบาล', 'Valuation'],
    trending_rank: 2,
    trending_source: 'demo',
  },
  {
    ...demo(
      'lh-next-chapter',
      'LH รายได้รอบใหม่',
      'Property',
      slowly,
      'lh.png',
      2,
    ),
    excerpt: 'โอกาสจาก Backlog และการพัฒนาโครงการ',
    tickers: ['LH'],
    companies: ['Land and Houses'],
    secondary_topics: ['Valuation'],
    trending_rank: 3,
    trending_source: 'demo',
  },
  {
    ...demo(
      'start-investing',
      'เริ่มลงทุนยังไงดี?',
      'พื้นฐานการลงทุน',
      slowly,
      'bh.png',
      3,
    ),
    excerpt: 'ตั้งเป้าหมายให้ชัด ก่อนเริ่มเลือกหุ้น',
  },
  {
    ...demo(
      'understand-financial-statements',
      'งบการเงินคืออะไร?',
      '5Y FS',
      beginner,
      'bdms.jpg',
      4,
    ),
    excerpt: 'ทำความรู้จักงบการเงินสามส่วนสำคัญ',
  },
  {
    ...demo(
      'price-and-value',
      'ราคากับมูลค่า ต่างกันอย่างไร?',
      'Valuation',
      beginner,
      'lh.png',
      5,
    ),
    excerpt: 'มองความคาดหวังที่ซ่อนอยู่ในราคา',
  },
];
