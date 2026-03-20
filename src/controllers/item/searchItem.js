const Item = require("../../schema/item");
const { getEmbedding } = require("../../services/openai");

const searchItems = async (req, res) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: "Search query is required" });
  }

  try {

    const queryEmbedding = await getEmbedding(query);

 
    const results = await Item.aggregate([
      {
        $vectorSearch: {
          index: "vector_index",      
          path: "embedding",          
          queryVector: queryEmbedding,
          numCandidates: 100,          
          limit: 25      

        }
      },
      {
        $addFields: {
          score: { $meta: "vectorSearchScore" } 
        }
      },
      {
        $sort: { score: -1 } 
      }
    ]);

    return res.status(200).json(results);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { searchItems };