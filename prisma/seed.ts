import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ข้อมูลตัวอย่างสำหรับโพสต์
const sampleTitles = [
  "หาคู่เที่ยวเชียงใหม่",
  "ขายไอโฟน 15 Pro Max",
  "หาเพื่อนร่วมงาน Co-working",
  "แบ่งปันคอร์สเรียน React",
  "หาคนไปคอนเสิร์ตด้วยกัน",
  "ขายรถมอเตอร์ไซค์",
  "หาเพื่อนออกกำลังกาย",
  "แนะนำร้านอาหารอร่อย",
  "หาเพื่อนเล่นเกม",
  "ขายของใช้ในบ้าน",
  "หาคนร่วมเดินทางต่างประเทศ",
  "แบ่งปันหนังสือ",
  "หาคนช่วยงาน Freelance",
  "ขายเสื้อผ้าแบรนด์เนม",
  "หาเพื่อนดูหนัง",
  "แนะนำคาเฟ่น่านั่ง",
  "หาคนร่วมลงทุน",
  "ขายกล้องมือสอง",
  "หาเพื่อนเรียนภาษา",
  "แบ่งปันประสบการณ์ทำงาน",
  "หาคนขับรถไปด้วยกัน",
  "ขายคอมพิวเตอร์",
  "หาเพื่อนปั่นจักรยาน",
  "แนะนำสถานที่ท่องเที่ยว",
  "หาคนร่วมเป็นเจ้าของธุรกิจ",
  "ขายเครื่องดนตรี",
  "หาเพื่อนทำกิจกรรม",
  "แบ่งปันเทคนิคการเรียน",
  "หาคนร่วมแจมดนตรี",
  "ขายอุปกรณ์กีฬา",
  "หาเพื่อนเล่นบอร์ดเกม",
  "แนะนำแอปมือถือดี ๆ",
  "หาคนร่วมโปรเจกต์",
  "ขายหนังสือเรียน",
  "หาเพื่อนไปตลาดนัด",
  "แบ่งปันสูตรอาหาร",
  "หาคนร่วมเช่าที่พัก",
  "ขายเครื่องใช้ไฟฟ้า",
  "หาเพื่อนเดินป่า",
  "แนะนำเว็บไซต์น่าสนใจ",
  "หาคนร่วมออกแบบ",
  "ขายของสะสม",
  "หาเพื่อนเล่นกีฬา",
  "แบ่งปันเคล็ดลับ DIY",
  "หาคนร่วมศึกษา",
  "ขายเครื่องสำอาง",
  "หาเพื่อนไปเที่ยวทะเล",
  "แนะนำโปรแกรมดี ๆ",
  "หาคนร่วมเตรียมสอบ",
  "ขายอุปกรณ์ทำอาหาร",
];

const sampleContents = [
  "สนใจติดต่อมาทักแชทได้เลยครับ รายละเอียดเพิ่มเติมพร้อมตอบทุกคำถาม",
  "ของแท้ 100% ใหม่ยังไม่แกะกล่อง รับประกันศูนย์ไทย 1 ปี ราคาต่อรองได้",
  "อยากหาเพื่อนร่วมทำงานในพื้นที่ Co-working สไตล์ chill ๆ บรรยากาศดี",
  "มีคอร์สเรียนออนไลน์คุณภาพดี อยากแชร์ให้เพื่อน ๆ ที่สนใจ",
  "มีบัตรคอนเสิร์ตเหลือ 1 ใบ ใครสนใจไปด้วยกันมาทักกันได้",
  "รถสภาพดี เครื่องแน่น ไม่เคยชน ดูได้ที่บ้าน ราคาต่อรองได้นิดหน่อย",
  "หาเพื่อนไปออกกำลังกายตอนเช้า เริ่มตั้งแต่ 6 โมง ใครพร้อมมาร่วมกัน",
  "เจอร้านอาหารอร่อยราคาไม่แพง อยากแนะนำให้ทุกคนลองไป",
  "เล่นเกมแนว RPG อยากหาเพื่อนเล่นด้วยกัน มีดิสคอร์ดแล้ว",
  "ขายของใช้ในบ้านที่ไม่ใช้แล้ว สภาพดี ราคาถูก จัดส่งได้",
  "วางแผนเดินทางไปยุโรป อยากหาเพื่อนไปด้วยกัน แบ่งค่าใช้จ่าย",
  "มีหนังสือดี ๆ หลายเล่ม อยากแบ่งปันให้คนที่รักการอ่าน",
  "มีงาน Freelance เข้ามา ต้องการคนช่วยงาน สามารถทำงานจากที่บ้านได้",
  "ขายเสื้อผ้าแบรนด์เนมของแท้ ใส่ไม่กี่ครั้ง สภาพเหมือนใหม่",
  "อยากไปดูหนังเรื่องใหม่ที่โรงภาพยนตร์ ใครอยากไปด้วยกัน",
  "เจอคาเฟ่ใหม่บรรยากาศดี เหมาะสำหรับทำงาน มี Wi-Fi แรง",
  "มีไอเดียธุรกิจดี ๆ อยากหาคนร่วมลงทุน มีประสบการณ์",
  "ขายกล้อง DSLR มือสอง สภาพดี ใช้งานน้อย รับประกันการทำงาน",
  "เปิดกลุ่มเรียนภาษาอังกฤษ เจอกันสัปดาห์ละ 2 ครั้ง ค่าเรียนถูก",
  "อยากแชร์ประสบการณ์การทำงานให้คนที่เพิ่งเริ่มทำงาน",
  "ขับรถไปต่างจังหวัด อยากหาคนไปด้วยแบ่งค่าน้ำมัน",
  "ขายคอมพิวเตอร์ตั้งโต๊ะ เล่นเกมได้ลื่น ใช้งานกราฟิกได้",
  "กลุ่มปั่นจักรยานวันเสาร์อาทิตย์ ใครสนใจมาร่วมกัน",
  "รู้จักสถานที่ท่องเที่ยวสวย ๆ ที่คนไม่รู้จักกัน มาแชร์กัน",
  "มีไอเดียธุรกิจออนไลน์ อยากหาพาร์ทเนอร์ร่วมทำ",
  "ขายกีตาร์โปร่ง สภาพดี เสียงใส เหมาะสำหรับมือใหม่",
  "จัดกิจกรรมกลุ่มสนุก ๆ ทุกวันเสาร์ ใครสนใจมาร่วม",
  "มีเทคนิคการเรียนที่ได้ผล อยากแชร์ให้เพื่อน ๆ นักเรียน",
  "มีกลุ่มแจมดนตรีแนวป็อป ใครเล่นเครื่องดนตรีได้มาร่วมกัน",
  "ขายอุปกรณ์กีฬา ใหม่ยังไม่ใช้ ซื้อมาแล้วไม่มีเวลาเล่น",
  "กลุ่มเล่นบอร์ดเกมทุกวันศุกร์ ใครสนใจมาร่วมสนุกกัน",
  "เจอแอปมือถือดี ๆ ที่ช่วยในชีวิตประจำวัน มาแนะนำกัน",
  "มีโปรเจกต์น่าสนใจ ต้องการทีมมาร่วมพัฒนาด้วยกัน",
  "ขายหนังสือเรียนมหาวิทยาลัย สภาพดี ราคาถูกกว่าใหม่",
  "อยากไปตลาดนัดวันหยุด ใครอยากไปด้วยกันติดต่อมา",
  "มีสูตรอาหารง่าย ๆ ทำเองได้ที่บ้าน อยากแชร์ให้ทุกคน",
  "หาคนร่วมเช่าคอนโดใกล้ BTS แบ่งค่าเช่ากัน สะอาดปลอดภัย",
  "ขายเครื่องใช้ไฟฟ้าสภาพดี การันตีการทำงาน ราคาต่อรองได้",
  "กลุ่มเดินป่าวันอาทิตย์ ออกกำลังกายและสัมผัสธรรมชาติ",
  "เจอเว็บไซต์ดี ๆ ที่มีประโยชน์ อยากแชร์ให้เพื่อน ๆ",
  "ทีมออกแบบรับงาน โลโก้ โปสเตอร์ บรรจุภัณฑ์ ราคาเป็นมิตร",
  "ขายของสะสมหายาก สำหรับคนที่ชื่นชอบ ราคาตามตลาด",
  "กลุ่มเล่นกีฬาทุกวันเสาร์ ใครสนใจมาออกกำลังกายด้วยกัน",
  "เทคนิค DIY ทำของใช้เองง่าย ๆ ประหยัดและสนุก",
  "กลุ่มศึกษาร่วมกัน ช่วยเหลือกันทำการบ้าน เตรียมสอบ",
  "ขายเครื่องสำอางแบรนด์ดัง ของแท้ราคาดี ยังไม่เปิดใช้",
  "วางแผนเดินทางไปทะเลใต้ อยากหาเพื่อนไปเที่ยวด้วยกัน",
  "แนะนำโปรแกรมคอมพิวเตอร์ฟรี ๆ ที่มีประโยชน์ในชีวิตประจำวัน",
  "กลุ่มเตรียมตัวสอบต่าง ๆ ช่วยเหลือและกำลังใจซึ่งกันและกัน",
];

const sampleTags = [
  "ขาย",
  "หา",
  "แชร์",
  "เที่ยว",
  "เกม",
  "อาหาร",
  "กีฬา",
  "ดนตรี",
  "ศึกษา",
  "ทำงาน",
  "ธุรกิจ",
  "เทคโนโลยี",
  "แฟชั่น",
  "สุขภาพ",
  "ศิลปะ",
  "หนังสือ",
  "ภาพยนตร์",
  "คาเฟ่",
  "ช็อปปิ้ง",
  "ธรรมชาติ",
  "แจมดนตรี",
  "ปั่นจักรยาน",
  "วิ่ง",
  "ยิม",
  "โยคะ",
  "ภาษา",
  "โปรแกรมมิ่ง",
  "ดีไซน์",
  "การเงิน",
  "ลงทุน",
  "รถยนต์",
  "มอเตอร์ไซค์",
  "เครื่องใช้ไฟฟ้า",
  "คอมพิวเตอร์",
  "มือถือ",
  "กล้อง",
  "หูฟัง",
  "เสื้อผ้า",
  "รองเท้า",
  "กระเป๋า",
  "นาฬิกา",
  "เครื่องประดับ",
  "ของสะสม",
  "หนังสือ",
  "เกมส์",
  "ของเล่น",
  "กีตาร์",
];

const sampleAuthors = [
  "Alice",
  "Bob",
  "Charlie",
  "Diana",
  "Eve",
  "Frank",
  "Grace",
  "Henry",
  "Ivy",
  "Jack",
  "Kate",
  "Liam",
  "Mia",
  "Noah",
  "Olivia",
  "Paul",
  "Quinn",
  "Ruby",
  "Sam",
  "Tara",
  "Uma",
  "Victor",
  "Wendy",
  "Xander",
  "Yara",
  "Zoe",
  "Alex",
  "Blake",
  "Casey",
  "Drew",
  "Ellis",
  "Finley",
  "Gray",
  "Harper",
  "Indigo",
  "Jordan",
  "Kai",
  "Lane",
  "Morgan",
  "Noel",
  "Paxปณ",
  "กมล",
  "ชาญ",
  "ดวง",
  "เอก",
  "ฟ้า",
  "ใหม่",
  "จิม",
  "เกด",
  "ลิซ",
  "มิ้ม",
  "นัท",
  "โอ๋",
  "ปิง",
  "คิว",
  "เรน",
];

// Function to get random element from array
function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

// Function to get random elements from array
function getRandomElements<T>(array: T[], count: number): T[] {
  const shuffled = array.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Function to generate random IP address
function generateRandomIP(): string {
  return `${Math.floor(Math.random() * 256)}.${Math.floor(
    Math.random() * 256
  )}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`;
}

// Function to generate random date within last 3 days to now (more recent posts)
function getRandomDate(): Date {
  const now = new Date();
  const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);
  const randomTime =
    threeDaysAgo.getTime() +
    Math.random() * (now.getTime() - threeDaysAgo.getTime());
  return new Date(randomTime);
}

// Function to generate expiration date (24 hours from creation, some may be expired)
function getExpirationDate(createdAt: Date): Date {
  // Add 24 hours to creation time
  const expirationTime = createdAt.getTime() + 24 * 60 * 60 * 1000;
  return new Date(expirationTime);
}

async function main() {
  console.log("🌱 Starting seed...");

  // Clear existing data
  console.log("🧹 Cleaning existing data...");
  await prisma.post.deleteMany({});
  await prisma.tag.deleteMany({});

  // Create tags first
  console.log("🏷️ Creating tags...");
  const tags = [];
  for (const tagName of sampleTags) {
    try {
      const tag = await prisma.tag.upsert({
        where: { name: tagName },
        update: {},
        create: { name: tagName },
      });
      tags.push(tag);
    } catch (error) {
      // If tag already exists, find it
      const existingTag = await prisma.tag.findUnique({
        where: { name: tagName },
      });
      if (existingTag) {
        tags.push(existingTag);
      }
    }
  }
  console.log(`✅ Created/Updated ${tags.length} tags`);

  // Generate posts
  console.log("📝 Creating posts...");
  const numberOfPosts = Math.floor(Math.random() * 51) + 50; // 50-100 posts

  for (let i = 0; i < numberOfPosts; i++) {
    const createdAt = getRandomDate();
    const expiresAt = getExpirationDate(createdAt);

    // Select random tags for this post (1-4 tags)
    const postTagCount = Math.floor(Math.random() * 4) + 1;
    const selectedTags = getRandomElements(tags, postTagCount);

    const post = await prisma.post.create({
      data: {
        title: getRandomElement(sampleTitles),
        content: getRandomElement(sampleContents),
        authorName: getRandomElement(sampleAuthors),
        author_ipaddress: generateRandomIP(),
        createdAt: createdAt,
        expiresAt: expiresAt,
        tags: {
          connect: selectedTags.map((tag) => ({ id: tag.id })),
        },
      },
    });

    if ((i + 1) % 10 === 0) {
      console.log(`📝 Created ${i + 1}/${numberOfPosts} posts...`);
    }
  }

  console.log(`✅ Created ${numberOfPosts} posts`);

  // Show summary
  const totalPosts = await prisma.post.count();
  const totalTags = await prisma.tag.count();

  console.log("\n📊 Seed Summary:");
  console.log(`📝 Total Posts: ${totalPosts}`);
  console.log(`🏷️ Total Tags: ${totalTags}`);
  console.log("🎉 Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
