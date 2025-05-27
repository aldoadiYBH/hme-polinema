export default async function ShowLoker({
    params
}: {
    params: Promise<{ lokerId: string }>
}) {
    const { lokerId } = await params;
    return (
        <div>
            slug {lokerId}
        </div>
    )
};
