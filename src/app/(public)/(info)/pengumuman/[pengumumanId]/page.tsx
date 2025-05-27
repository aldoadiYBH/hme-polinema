export default async function ShowPengumuman({
    params
}: {
    params: Promise<{ pengumumanId: string }>
}) {
    const { pengumumanId } = await params;
    return (
        <div>
            slug {pengumumanId}
        </div>
    )
};
