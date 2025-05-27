export default async function ShowBeasiswa({
    params
}: {
    params: Promise<{ beasiswaId: string }>
}) {
    const { beasiswaId } = await params;
    return (
        <div>
            slug {beasiswaId}
        </div>
    )
};
