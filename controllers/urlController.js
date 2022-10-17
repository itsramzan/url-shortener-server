// Import essential models
import User from "../models/userModel.js";
import URL from "../models/urlModel.js";

// Shorten url
export const shorten = async (req, res, next) => {
  try {
    const { uniqueText, fullUrl } = req.body || {};
    const data = { uniqueText, fullUrl };
    const { _id } = req.payload;
    const finalData = { ...data, user: _id };

    const newUrl = new URL(finalData);
    const url = await newUrl.save();

    const result = await url.populate("user", "_id username email");

    await User.updateOne({ _id }, { $push: { urls: result._id } });

    res.status(200).json({ message: "URL successfully shorten", result });
  } catch (err) {
    next(err);
  }
};

// Get urls
export const getUrls = async (req, res, next) => {
  try {
    const page = parseInt(req.query?.page) || 1;
    const limit = parseInt(process.env.URL_LIMIT);

    const results = await URL.find({ user: req.payload._id })
      .populate("user", "_id username email")
      .skip(page * limit - limit)
      .limit(limit)
      .sort({ createdAt: "desc" });

    const items = await URL.find({ user: req.payload._id }).count();
    const pages = Math.ceil(items / limit);

    res.status(200).json({
      results,
      currentPage: page,
      totalPage: pages,
      totalItem: items,
    });
  } catch (err) {
    next(err);
  }
};

// Update url
export const updateUrl = async (req, res, next) => {
  try {
    const data = req.body;
    const result = await URL.findOneAndUpdate(
      { _id: req.params.id, user: req.payload._id },
      { $set: data },
      { new: true }
    ).populate("user", "_id username email");

    res.status(201).json({ message: "URL successfully updated", result });
  } catch (err) {
    next(err);
  }
};

// Delete url
export const deleteUrl = async (req, res, next) => {
  try {
    const result = await URL.findOneAndDelete({
      _id: req.params.id,
      user: req.payload._id,
    });

    if (result) {
      await User.updateOne(
        { _id: req.payload._id },
        { $pull: { urls: result._id } }
      );

      res.status(201).json({ message: "URL successfully deleted", result });
    } else {
      res.status(404).json({ message: "No URL found for delete" });
    }
  } catch (err) {
    next(err);
  }
};

// Redirect url
export const redirect = async (req, res, next) => {
  try {
    const { uniqueText } = req.params;

    const result = await URL.findOne({ uniqueText });

    if (result) {
      const { fullUrl } = result;

      res.status(200).redirect(fullUrl);
    } else {
      res.status(404).json({ message: "No URL found for redirect" });
    }
  } catch (err) {
    next(err);
  }
};
