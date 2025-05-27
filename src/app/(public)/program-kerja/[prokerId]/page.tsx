import { notFound } from "next/navigation";
import Image from "next/image";

const programList = [
    {
        slug: "program-1-ss",
        title: "Open Recruitment Staff Ahli",
        image: "/assets/placeholder.jpg",
        content: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut itaque perferendis
    in voluptates unde magnam, aspernatur ipsam aperiam tenetur illum autem nam, 
    inventore sequi quisquam. Doloremque qui ipsa delectus quia expedita nam labore nisi dolorum fuga fugiat? Ipsam amet 
    perferendis a debitis quis, quibusdam quidem consequatur, optio tempora perspiciatis nemo?

    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid, reprehenderit cumque? Nesciunt sint laborum quisquam ab sequi placeat modi explicabo consectetur minima ipsa, numquam ea facere. Porro libero, dolores nulla deserunt impedit et quas ducimus vel, rerum alias consequuntur sequi unde in quia similique cum ut natus pariatur. Quo, consectetur ratione non pariatur vel laudantium voluptate voluptates consequatur fuga beatae?
    `
    },
    {
        slug: "program-fffs",
        title: "Workshop Desain Elektronika",
        image: "/assets/placeholder.jpg",
        content: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut itaque perferendis
    in voluptates unde magnam, aspernatur ipsam aperiam tenetur illum autem nam, 
    inventore sequi quisquam. Doloremque qui ipsa delectus quia expedita nam labore nisi dolorum fuga fugiat? Ipsam amet 
    perferendis a debitis quis, quibusdam quidem consequatur, optio tempora perspiciatis nemo?

    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid, reprehenderit cumque? Nesciunt sint laborum quisquam ab sequi placeat modi explicabo consectetur minima ipsa, numquam ea facere. Porro libero, dolores nulla deserunt impedit et quas ducimus vel, rerum alias consequuntur sequi unde in quia similique cum ut natus pariatur. Quo, consectetur ratione non pariatur vel laudantium voluptate voluptates consequatur fuga beatae?
    `
    },
    {
        slug: "program-s",
        title: "Kegiatan Bakti Sosial",
        image: "/assets/placeholder.jpg",
        content: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut itaque perferendis
    in voluptates unde magnam, aspernatur ipsam aperiam tenetur illum autem nam, 
    inventore sequi quisquam. Doloremque qui ipsa delectus quia expedita nam labore nisi dolorum fuga fugiat? Ipsam amet 
    perferendis a debitis quis, quibusdam quidem consequatur, optio tempora perspiciatis nemo?

    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid, reprehenderit cumque? Nesciunt sint laborum quisquam ab sequi placeat modi explicabo consectetur minima ipsa, numquam ea facere. Porro libero, dolores nulla deserunt impedit et quas ducimus vel, rerum alias consequuntur sequi unde in quia similique cum ut natus pariatur. Quo, consectetur ratione non pariatur vel laudantium voluptate voluptates consequatur fuga beatae?
    `
    }
];

export default async function ShowProker({
    params
}: {
    params: Promise<{ prokerId: string }>
}) {
    const { prokerId } = await params;
    const program = programList.find(p => p.slug === prokerId);

    if (!program) return notFound();

    return (
        <div className="max-w-3xl mx-auto space-y-6 py-10 px-4">
            <h1 className="text-4xl font-bold tracking-tight">{program.title}</h1>

            <div className="w-full rounded-lg overflow-hidden">
                <Image
                    src={program.image}
                    alt={program.title}
                    width={800}
                    height={400}
                    className="rounded-md object-cover w-full h-64"
                />
            </div>

            <div className="prose prose-neutral dark:prose-invert max-w-none">
                {/* Render markdown-style content safely */}
                {program.content.split("\n").map((line, i) =>
                    line.startsWith("###") ? (
                        <h3 key={i} className="text-xl font-semibold mt-4">{line.replace("###", "").trim()}</h3>
                    ) : line.trim() === "" ? (
                        <br key={i} />
                    ) : (
                        <p key={i}>{line}</p>
                    )
                )}
            </div>
        </div>
    );
}
