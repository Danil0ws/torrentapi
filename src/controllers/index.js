module.exports = (app) => {
    this.emptyPage = async (req, res) => {
        res.status(401).json({"msg": "Not Found"});
    }
    return this;
}