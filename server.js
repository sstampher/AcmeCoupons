const Sequelize = require('sequelize');
const conn = new Sequelize( process.env.DATABASE_URL || 'postgres://localhost/acme_coupon_db');

const Coupon = conn.define( 'coupon', {
    name: {
        type: Sequelize.STRING
    },
    percentOff: {
        type: Sequelize.INTEGER
    }
} )

const Product = conn.define( 'product', {
    name: {
        type: Sequelize.STRING
    }
} )

Coupon.belongsTo(Product);
Product.hasMany(Coupon);

const syncAndSeed = async () => {
    await conn.sync({force:true});
    const foo = await Product.create({ name: 'foo'});
    const bar = await Product.create({ name: 'bar'});
    const bazz = await Product.create({ name: 'bazz'});
    await Coupon.create({ name: '50% off foo', percentOff: 50, productId: foo.id });
    await Coupon.create({ name: '20% off bar', percentOff: 20, productId: bar.id });
}

syncAndSeed();

