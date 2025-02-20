import { repos, contributors, kunaicoMembers } from "../types/consts.js";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

export const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function updateReposData() {
	//Get repositories data
	try {
		const responses = await Promise.all(
			repos.map((repo) =>
				fetch(`https://api.github.com/repos/${repo}`, {
					headers: {
						Accept: "application/json",
						"User-Agent": "Cloudflare Worker",
						Authorization: `Bearer ${process.env.GH_API_KEY}`,
					},
				}),
			),
		);
		const repositories = await Promise.all(responses.map((res) => res.json()));

		// Write the repositories data to a JSON file
		const filePath = path.join(__dirname, "../data/repositories.json");
		await fs.writeFile(filePath, JSON.stringify(repositories, null, 2));
	} catch (error) {
		console.error("Error fetching repos:", error);
		//empty repositories.json file
		const filePath = path.join(__dirname, "../data/repositories.json");
		await fs.writeFile(filePath, "");
		process.exit(1);
	}
}

updateReposData();

async function updateMembersData() {
	try {
		const responses = await Promise.all(
			contributors.map((user) =>
				fetch(`https://api.github.com/users/${user}`, {
					headers: {
						Accept: "application/json",
						"User-Agent": "Cloudflare Worker",
						Authorization: `Bearer ${process.env.GH_API_KEY}`,
					},
				}),
			),
		);
		const members = await Promise.all(responses.map((res) => res.json()));

		// Write the members data to a JSON file
		const filePath = path.join(__dirname, "../data/members.json");
		await fs.writeFile(filePath, JSON.stringify(members, null, 2));
	} catch (error) {
		console.error("Error fetching members:", error);
		//empty members.json file
		const filePath = path.join(__dirname, "../data/members.json");
		await fs.writeFile(filePath, "");
		process.exit(1);
	}
}

updateMembersData();

async function updateCommitsData() {
	try {
		const responses = await Promise.all(
			repos.flatMap((repo) =>
				kunaicoMembers.map((author) =>
					fetch(
						`https://api.github.com/repos/${repo}/commits?author=${author}`,
						{
							headers: {
								Accept: "application/json",
								"User-Agent": "Cloudflare Worker",
								Authorization: `Bearer ${process.env.GH_API_KEY}`,
							},
						},
					),
				),
			),
		);
		const commits = await Promise.all(responses.map((res) => res.json()));
		const flattenedCommits = commits.flat(); // Flatten the array of commits
		// Write the commits data to a JSON file
		const filePath = path.join(__dirname, "../data/commits.json");
		await fs.writeFile(filePath, JSON.stringify(flattenedCommits, null, 2));
	} catch (error) {
		console.error("Error fetching commits:", error);
		//empty commits.json file
		const filePath = path.join(__dirname, "../data/commits.json");
		await fs.writeFile(filePath, "");
		process.exit(1);
	}
}

updateCommitsData();