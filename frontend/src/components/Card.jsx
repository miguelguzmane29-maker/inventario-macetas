function Card({ titulo, valor }) {

    return (
        <div className="bg-white rounded-xl shadow-lg p-6">

            <h2 className="text-gray-500 text-lg">
                {titulo}
            </h2>

            <p className="text-3xl font-bold mt-2">
                {valor}
            </p>

        </div>
    );
}

export default Card;