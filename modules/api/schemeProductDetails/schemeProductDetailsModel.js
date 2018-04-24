const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const schemeProductDetailsSchema = require('../schemeProductDetails/schemeProductDetailsSchema');
const schemeProductDetailsModel = mongoose.model('schemeProductDetails', schemeProductDetailsSchema, 'schemeProductDetails');

const qrcodesSchema = require('../qrcodes/qrcodesSchema');
const qrcodesModel = require('../qrcodes/qrcodesModel');
const qrcodesMd = mongoose.model('qrcodes', qrcodesSchema, 'qrcodes');

const schemeProductsSchema = require('../schemeProducts/schemeProductsSchema');
const schemeProductsModel = require('../schemeProducts/schemeProductsModel');
const schemeProductsMd = mongoose.model('schemeProducts', schemeProductsSchema, 'schemeProducts');

const schemesSchema = require('../schemes/schemesSchema');
const schemesModel = require('../schemes/schemesModel');

const createSchemeProductDetails = async(schemeProductDetail) => {
    try
    {
        console.log(schemeProductDetail);
        //Kiểm tra QRCode
        let qrCode = await qrcodesModel.findQRCodebyCode(schemeProductDetail.qrCode);
        if(qrCode !== null && qrCode !== {})
        {
            //Nếu qrCode đã kích hoạt
            if(ObjectId(qrCode.status) === ObjectId("5a7a6f07feb222491ab93fac"))
            {
                schemeProductDetail.qrCode = qrCode._id;
                let result = await schemeProductDetailsModel.create(schemeProductDetail);
                if(result !== null)
                {
                    //Thay đổi trạng thái QRCode
                    await qrcodesModel.updateQRCode(qrCode._id, "5a7a6ee4feb222491ab93ef5"); // Đã gán
                    //Cộng số lượng đã gán
                    let schemeProduct = await schemeProductsModel.findSchemeProductById(schemeProductDetail.schemeProduct);
                    await schemeProductsModel.updateSchemeProduct(schemeProduct._id, schemeProduct.quantityDeployed + 1, schemeProduct.quantityRemaining - 1);

                    let scheme = await schemesModel.findSchemeByIdSchemeProduct(schemeProductDetailsModel.schemeProduct);
                    await schemesModel.updateStatusScheme(scheme._id, "5a7d042bfeb222491ae33ae3"); //Đang hoàn thành
                    if((schemeProduct.quantityRemaining - 1) === 0)
                    {
                        await schemesModel.updateStatusScheme(scheme._id, "5aceda1afeb222491ac92dcc"); //Đã hoàn thành
                    }

                    return 1;
                }
            }

            return -2; //QRCode không khả dụng
        }
        
        return -1; //Không tồn tại QRCode
    }
    catch(err)
    {
        console.log(err);

        return null;
    }
}

const selectSchemeProductDetails = async(idProduct, QRCode) => {
    console.log(QRCode);
    //Nếu lọc theo QRCode
    if(idProduct === "")
    {
    return await schemeProductDetailsModel.find({qrCode : {$ne : null}})
        .populate({
            path: 'schemeProduct',
            model: schemeProductsMd
          })
        .populate({
            path: 'qrCode',
            model: qrcodesMd,
            match : {code : QRCode}
        })
        .exec();
    }
}
module.exports = {
    createSchemeProductDetails, selectSchemeProductDetails
}