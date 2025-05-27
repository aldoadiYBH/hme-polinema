export default async function ShowEdukasi({
    params
}: {
    params: Promise<{ edukasiId: string }>
}) {
    const { edukasiId } = await params;
    return (
        <div>
            slug {edukasiId}
        </div>
    )
};
