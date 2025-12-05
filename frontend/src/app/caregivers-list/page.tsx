"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/api-client";
import { Star } from "lucide-react";

interface Caregiver {
  id: string;
  userId: string;
  bio: string;
  careTypes: string[];
  location: { city: string; state: string };
  priceRange: { min: number; max: number; currency: string };
  rating: number;
}

export default function CaregiversListPage() {
  const router = useRouter();
  const [caregivers, setCaregivers] = useState<Caregiver[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    careType: "",
    city: "",
  });

  useEffect(() => {
    loadCaregivers();
  }, []);

  const loadCaregivers = async () => {
    try {
      const params = new URLSearchParams();
      if (filters.careType) params.append("careType", filters.careType);
      if (filters.city) params.append("city", filters.city);

      const data = await apiClient.get<Caregiver[]>(
        `/api/caregivers?${params.toString()}`,
        null
      );
      setCaregivers(data);
    } catch (err) {
      console.error("Erro ao carregar cuidadores:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters({ ...filters, [key]: value });
  };

  const applyFilters = () => {
    setLoading(true);
    loadCaregivers();
  };

  if (loading) {
    return <div style={{ padding: "2rem" }}>Carregando...</div>;
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h1>Explorar Cuidadores</h1>
        <button
          onClick={() => router.back()}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#ccc",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Voltar
        </button>
      </div>

      <div
        style={{
          backgroundColor: "#f5f5f5",
          padding: "1.5rem",
          borderRadius: "8px",
          marginBottom: "2rem",
        }}
      >
        <h2 style={{ marginBottom: "1rem" }}>Filtros</h2>
        <div style={{ display: "flex", gap: "1rem", alignItems: "end" }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: "block", marginBottom: "0.5rem" }}>
              Tipo de cuidado
            </label>
            <select
              value={filters.careType}
              onChange={(e) => handleFilterChange("careType", e.target.value)}
              style={{
                width: "100%",
                padding: "0.5rem",
                fontSize: "1rem",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            >
              <option value="">Todos</option>
              <option value="elderly">Idosos</option>
              <option value="children">Crianças</option>
              <option value="special_needs">Necessidades especiais</option>
            </select>
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: "block", marginBottom: "0.5rem" }}>
              Cidade
            </label>
            <input
              type="text"
              value={filters.city}
              onChange={(e) => handleFilterChange("city", e.target.value)}
              placeholder="Ex: São Paulo"
              style={{
                width: "100%",
                padding: "0.5rem",
                fontSize: "1rem",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </div>
          <button
            onClick={applyFilters}
            style={{
              padding: "0.5rem 1.5rem",
              fontSize: "1rem",
              backgroundColor: "#0070f3",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Filtrar
          </button>
        </div>
      </div>

      {caregivers.length === 0 ? (
        <p>Nenhum cuidador encontrado com os filtros selecionados.</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
          {caregivers.map((caregiver) => (
            <div
              key={caregiver.id}
              style={{
                border: "1px solid #ddd",
                padding: "1.5rem",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "box-shadow 0.2s",
              }}
              onClick={() => router.push(`/caregivers/${caregiver.id}`)}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <h3 style={{ marginTop: 0 }}>Cuidador</h3>
              <p style={{ color: "#666", fontSize: "0.9rem", marginBottom: "1rem" }}>
                {caregiver.bio.substring(0, 100)}...
              </p>
              <div style={{ marginBottom: "0.5rem" }}>
                <strong>Tipos:</strong>{" "}
                {caregiver.careTypes
                  .map((t) => {
                    if (t === "elderly") return "Idosos";
                    if (t === "children") return "Crianças";
                    if (t === "special_needs") return "Especiais";
                    return t;
                  })
                  .join(", ")}
              </div>
              <div style={{ marginBottom: "0.5rem" }}>
                <strong>Localização:</strong> {caregiver.location.city}, {caregiver.location.state}
              </div>
              <div style={{ marginBottom: "0.5rem" }}>
                <strong>Preço:</strong> R$ {caregiver.priceRange.min} - R$ {caregiver.priceRange.max}
                /hora
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <strong>Avaliação:</strong>{" "}
                <span style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>
                  {caregiver.rating.toFixed(1)}
                  <Star className="cp-icon-sm" style={{ width: "14px", height: "14px", color: "#f59e0b" }} />
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/caregivers/${caregiver.id}`);
                }}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  backgroundColor: "#0070f3",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Ver perfil completo
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

