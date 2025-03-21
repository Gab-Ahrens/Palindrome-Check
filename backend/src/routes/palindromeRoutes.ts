import express from "express";
import type { Request, Response } from "express";
import { getConnection } from "../config/db";

const router = express.Router();

const isPalindrome = (str: string): boolean => {
  const cleaned = str.replace(/[\W_]/g, "").toLowerCase();
  return cleaned === cleaned.split("").reverse().join("");
};

router.post("/check-palindrome", async (req: Request, res: Response) => {
  const { input_text } = req.body;

  if (!input_text) {
    return res.status(400).json({ error: "Input text is required" });
  }

  const is_palindrome = isPalindrome(input_text) ? 1 : 0;

  try {
    const conn = await getConnection();
    const result = await conn.query(
      "INSERT INTO palindrome_checks (input_text, is_palindrome) VALUES (?, ?)",
      [input_text, is_palindrome]
    ) as any;
    conn.release();

    res.json({
      id: Number(result.insertId),
      input_text,
      is_palindrome: !!is_palindrome,
    });
  } catch (err) {
    res.status(500).json({ error: "Database error", details: err });
  }
});

router.get("/history", async (_req: Request, res: Response) => {
  try {
    const conn = await getConnection();
    const rows = await conn.query("SELECT * FROM palindrome_checks ORDER BY id DESC LIMIT 20");
    conn.release();

    res.json(
      rows.map((row: any) => ({
        ...row,
        is_palindrome: !!row.is_palindrome,
      }))
    );
  } catch (err) {
    res.status(500).json({ error: "Database error", details: err });
  }
});

router.delete("/history", async (_req: Request, res: Response) => {
  try {
    const conn = await getConnection();
    await conn.query("DELETE FROM palindrome_checks");
    conn.release();

    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: "Database error", details: err });
  }
});

export default router;
