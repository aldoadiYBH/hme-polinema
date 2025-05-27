export default async function ShowKritik({
    params
}: {
    params: Promise<{ kritikId: string }>
}) {
    const { kritikId } = await params;
    return (
        <div>
            slug {kritikId}
        </div>
    )
};
