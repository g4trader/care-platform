"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiClient } from "@/lib/api-client";

interface Course {
  id: string;
  name: string;
  description: string;
  duration: number;
  level: string;
}

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCourse = async () => {
      try {
        const data = await apiClient.get<Course>(`/api/courses/${params.id}`, null);
        setCourse(data);
      } catch (err) {
        console.error("Erro ao carregar curso:", err);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      loadCourse();
    }
  }, [params.id]);

  if (loading) {
    return <div style={{ padding: "2rem" }}>Carregando...</div>;
  }

  if (!course) {
    return <div style={{ padding: "2rem" }}>Curso não encontrado</div>;
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <button
        onClick={() => router.back()}
        style={{
          marginBottom: "1rem",
          padding: "0.5rem 1rem",
          backgroundColor: "#ccc",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        ← Voltar
      </button>

      <h1>{course.name}</h1>
      <div style={{ marginBottom: "1rem", color: "#666" }}>
        <span>Carga horária: {course.duration}h</span> • <span>Nível: {course.level}</span>
      </div>
      <p style={{ lineHeight: "1.6", fontSize: "1.1rem" }}>{course.description}</p>

      <div
        style={{
          marginTop: "2rem",
          padding: "1.5rem",
          backgroundColor: "#f5f5f5",
          borderRadius: "8px",
        }}
      >
        <p style={{ fontStyle: "italic", color: "#666" }}>
          Em breve: conteúdo completo do curso, vídeos e certificação.
        </p>
      </div>
    </div>
  );
}

