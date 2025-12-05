"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { apiClient } from "@/lib/api-client";
import { Star, CheckCircle } from "lucide-react";

interface Caregiver {
  id: string;
  userId: string;
  bio: string;
  careTypes: string[];
  location: { city: string; state: string };
  priceRange: { min: number; max: number; currency: string };
  certifications: string[];
  rating: number;
}

interface Course {
  id: string;
  name: string;
}

export default function CaregiverProfilePage() {
  const params = useParams();
  const router = useRouter();
  const { userId, role } = useAuth();
  const [caregiver, setCaregiver] = useState<Caregiver | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const caregiverData = await apiClient.get<Caregiver>(
          `/api/caregivers/${params.id}`,
          null
        );
        setCaregiver(caregiverData);

        // Carregar cursos para mostrar certificações
        const allCourses = await apiClient.get<Course[]>("/api/courses", null);
        setCourses(allCourses);
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      loadData();
    }
  }, [params.id]);

  const handleInterest = async () => {
    if (role !== "client") {
      alert("Apenas contratantes podem demonstrar interesse");
      return;
    }

    // Por enquanto, apenas mostra uma mensagem
    // No futuro, isso poderia criar um ClientRequest ou registrar interesse
    alert("Funcionalidade de interesse será implementada em breve!");
  };

  if (loading) {
    return <div style={{ padding: "2rem" }}>Carregando...</div>;
  }

  if (!caregiver) {
    return <div style={{ padding: "2rem" }}>Cuidador não encontrado</div>;
  }

  const caregiverCourses = courses.filter((c) =>
    caregiver.certifications.includes(c.id)
  );

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

      <div
        style={{
          border: "1px solid #ddd",
          padding: "2rem",
          borderRadius: "8px",
          marginBottom: "2rem",
        }}
      >
        <h1 style={{ marginTop: 0 }}>Perfil do Cuidador</h1>

        <div style={{ marginBottom: "1.5rem" }}>
          <h2>Sobre</h2>
          <p style={{ lineHeight: "1.6" }}>{caregiver.bio}</p>
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <h3>Especialidades</h3>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {caregiver.careTypes.map((type) => (
              <span
                key={type}
                style={{
                  padding: "0.5rem 1rem",
                  backgroundColor: "#e3f2fd",
                  borderRadius: "20px",
                  fontSize: "0.9rem",
                }}
              >
                {type === "elderly" && "Cuidado de Idosos"}
                {type === "children" && "Cuidado de Crianças"}
                {type === "special_needs" && "Cuidado Especializado"}
              </span>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <h3>Localização</h3>
          <p>
            {caregiver.location.city}, {caregiver.location.state}
          </p>
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <h3>Preço</h3>
          <p>
            R$ {caregiver.priceRange.min} - R$ {caregiver.priceRange.max} / hora
          </p>
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <h3>Avaliação</h3>
          <p style={{ fontSize: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            {caregiver.rating.toFixed(1)}
            <Star className="cp-icon" style={{ width: "24px", height: "24px", color: "#f59e0b" }} />
          </p>
        </div>

        {caregiver.certifications.length > 0 && (
          <div style={{ marginBottom: "1.5rem" }}>
            <h3>Certificações</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {caregiverCourses.map((course) => (
                <div
                  key={course.id}
                  style={{
                    padding: "0.75rem",
                    backgroundColor: "#f5f5f5",
                    borderRadius: "4px",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <CheckCircle className="cp-icon" style={{ width: "20px", height: "20px", color: "#28a745" }} />
                  <span>{course.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {role === "client" && (
          <button
            onClick={handleInterest}
            style={{
              width: "100%",
              padding: "1rem",
              fontSize: "1.1rem",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              marginTop: "1rem",
            }}
          >
            Tenho interesse
          </button>
        )}
      </div>
    </div>
  );
}

