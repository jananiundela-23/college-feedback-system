
require('dotenv').config();
const express = require("express");
const supabase = require('./supabase')

const app = express();

const PORT =  process.env.PORT || 4000;

// Allows server to receive JSON
app.use(express.json());
app.use(express.static("public"));
app.post("/api/feedback", async (req, res) => {
    try {
        const feedback = req.body;

        const { data, error } = await supabase
            .from("feedback")
            .insert([feedback])
            .select();

        if (error) {
            console.error("Supabase error:", error);
            return res.status(500).json({
                message: "Failed to save feedback",
                error: error.message
            });
        }

        res.json({
            message: "Feedback saved successfully",
            data: data
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error"
        });
    }
});
app.get("/feedback/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const { data, error } = await supabase
            .from("feedback")
            .select("*")
            .eq("id", id)
            .single();

        if (error) {
            return res.status(404).json({
                message: "Feedback not found",
                error: error.message
            });
        }

        res.json({
            message: "Feedback fetched successfully",
            data: data
        });

    } catch (err) {
        res.status(500).json({
            message: "Server error",
            error: err.message
        });
    }
});
// Home
app.get("/", (req, res) => {
    res.send("College Feedback Backend is running!");
});

// Feedback API
app.post("/api/feedback", async(req, res) => {
    try{
        const{
            student_name,
            department,
            year,
            faculty_name,
            rating,
            comments
        } = req.body;
        const{data,error} = await supabase
             .from('feedback')
             .insert([
                {
                    student_name,
                    department,
                    year,
                    faculty_name,
                    rating,
                    comments
                }

             ])
             .select();
        if (error) {
            console.error(error);
            return
    res.status(500).json({
                    error: error.message     
    });        
        }
        res.status(201).json({
            message: 'feedback submitted successfully',
            data: data
        });    
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'server error'
        });
    }
});
app.get("/feedback/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const { data, error } = await supabase
            .from("feedback")
            .select("*")
            .eq("id", id)
            .single();

        if (error) {
            return res.status(404).json({
                message: "Feedback not found",
                error: error.message
            });
        }

        res.json({
            message: "Feedback fetched successfully",
            data: data
        });

    } catch (err) {
        res.status(500).json({
            message: "Server error",
            error: err.message
        });
    }
});
app.put("/feedback/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const {
            student_name,
            department,
            year,
            faculty_name,
            rating,
            comments
        } = req.body;

        const { data, error } = await supabase
            .from("feedback")
            .update({
                student_name,
                department,
                year,
                faculty_name,
                rating,
                comments
            })
            .eq("id", id)
            .select();

        if (error) {
            return res.status(500).json({
                message: "Failed to update feedback",
                error: error.message
            });
        }

        res.json({
            message: "Feedback updated successfully",
            data: data
        });

    } catch (err) {
        res.status(500).json({
            message: "Server error",
            error: err.message
        });
    }
});
app.delete("/feedback/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const { data, error } = await supabase
            .from("feedback")
            .delete()
            .eq("id", id)
            .select();

        if (error) {
            console.error("Supabase delete error:", error);

            return res.status(500).json({
                message: "Failed to delete feedback",
                error: error.message
            });
        }

        res.json({
            message: "Feedback deleted successfully",
            data: data
        });

    } catch (err) {
        console.error("Delete error:", err);

        res.status(500).json({
            message: "Failed to delete feedback",
            error: err.message
        });
    }
});
app.get("/feedback", async (req, res) => {
    try {
        const { data, error } = await supabase
            .from("feedback")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            return res.status(500).json({
                message: "Failed to fetch feedback",
                error: error.message
            });
        }

        res.json({
            message: "Feedback fetched successfully",
            data: data
        });

    } catch (err) {
        res.status(500).json({
            message: "Server error",
            error: err.message
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log("Server running on http://localhost:" + PORT); 

});
