// Rota para logout 

export async function POST() {
    // Remove o token do lado do cliente
    return new Response(JSON.stringify({ success: true }), { status: 204 });
}