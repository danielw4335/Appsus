
export function CategoryMap({ categoryMap }) {
    console.log(categoryMap)



    return (
        <section className="category">
  
            {categoryMap.map(res => {
                return (
                    <div>
                        <div style={{background: 'aqua', height: `${res.count * 3}em`, width: '120px' }}>{res.count/20 * 100 + '%'}</div>
                        <p>{res.brand}</p>
                    </div>
                )
            })}
        </section>
    )
}
