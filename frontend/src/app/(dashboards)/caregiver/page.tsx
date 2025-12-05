"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { apiClient } from "@/lib/api-client";
import CaregiverOnboarding from "@/components/CaregiverOnboarding";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Star, Calendar, Book, Award, Activity } from "lucide-react";

interface Caregiver {
  id: string;
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
  description: string;
  duration: number;
  level: string;
}

interface ClientRequest {
  id: string;
  careType: string;
  schedule: { startDate: string; timeSlots: string[] };
  location: { city: string; state: string };
  details: string;
  status: string;
}

export default function CaregiverDashboard() {
  const { userId, role, isAuthenticated } = useAuth();
  const router = useRouter();
  const [caregiver, setCaregiver] = useState<Caregiver | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [requests, setRequests] = useState<ClientRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || role !== "caregiver") {
      router.push("/login");
      return;
    }

    loadData();
  }, [userId, isAuthenticated, role, router]);

  const loadData = async () => {
    try {
      // Buscar perfil do cuidador
      const caregivers = await apiClient.get<Caregiver[]>("/api/caregivers", userId);
      const myProfile = caregivers.find((c: any) => c.userId === userId);

      if (myProfile) {
        setCaregiver(myProfile);
        setShowOnboarding(false);
      } else {
        setShowOnboarding(true);
      }

      // Buscar cursos
      const coursesData = await apiClient.get<Course[]>("/api/courses", userId);
      setCourses(coursesData);

      // Buscar pedidos disponíveis
      const requestsData = await apiClient.get<ClientRequest[]>(
        "/api/client-requests",
        userId
      );
      setRequests(requestsData.filter((r: any) => r.status === "open"));
    } catch (err) {
      console.error("Erro ao carregar dados:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleInterest = async (requestId: string) => {
    try {
      await apiClient.post(`/api/client-requests/${requestId}/interest`, {}, userId);
      alert("Interesse registrado com sucesso!");
      loadData();
    } catch (err: any) {
      alert(err.message || "Erro ao registrar interesse");
    }
  };

  if (loading) {
    return (
      <DashboardShell title="Painel do cuidador" roleLabel="CUIDADOR">
        <div className="cp-card" style={{ textAlign: "center", padding: "var(--spacing-3xl)" }}>
          <p>Carregando...</p>
        </div>
      </DashboardShell>
    );
  }

  if (showOnboarding) {
    return <CaregiverOnboarding onComplete={loadData} />;
  }

  return (
    <DashboardShell
      title="Painel do cuidador"
      subtitle="Veja sua agenda, oportunidades de cuidado e acompanhe seus relatórios."
      roleLabel="CUIDADOR"
    >
      {/* Grid de 2 colunas */}
      <div className="cp-dashboard-grid">
        {/* Coluna Esquerda */}
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-xl)" }}>
          {/* Agenda da Semana */}
          <div className="cp-card">
            <div className="cp-card-header">
              <div>
                <h3 className="cp-card-title">Agenda da semana</h3>
                <p className="cp-card-subtitle">3 serviços agendados</p>
              </div>
            </div>
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <div className="timeline-time">Hoje, 14:00</div>
                  <div className="timeline-text">Cuidado domiciliar - São Paulo, SP</div>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <div className="timeline-time">Amanhã, 09:00</div>
                  <div className="timeline-text">Acompanhamento médico - São Paulo, SP</div>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <div className="timeline-time">Quinta, 10:00</div>
                  <div className="timeline-text">Cuidado domiciliar - São Paulo, SP</div>
                </div>
              </div>
            </div>
          </div>

          {/* Pedidos Disponíveis */}
          <div className="cp-card">
            <div className="cp-card-header">
              <div>
                <h3 className="cp-card-title">Pedidos de cuidado disponíveis</h3>
                <p className="cp-card-subtitle">{requests.length} oportunidades abertas</p>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-md)" }}>
              {requests.length === 0 ? (
                <div className="cp-empty-state">
                  <Activity className="cp-empty-state-icon cp-icon-lg" style={{ width: "48px", height: "48px" }} />
                  <h4 className="cp-empty-state-title">Nenhum pedido disponível</h4>
                  <p className="cp-empty-state-text">
                    Não há pedidos de cuidado abertos no momento.
                  </p>
                </div>
              ) : (
                requests.slice(0, 3).map((request) => (
                  <div
                    key={request.id}
                    style={{
                      padding: "var(--spacing-md)",
                      border: "1px solid var(--color-gray-200)",
                      borderRadius: "var(--radius-lg)",
                      backgroundColor: "var(--color-gray-50)",
                    }}
                  >
                    <div style={{ marginBottom: "var(--spacing-sm)" }}>
                      <strong>
                        {request.careType === "elderly" && "Cuidado de Idosos"}
                        {request.careType === "children" && "Cuidado de Crianças"}
                        {request.careType === "special_needs" && "Cuidado Especializado"}
                      </strong>
                    </div>
                    <p style={{ fontSize: "var(--font-size-sm)", color: "var(--color-gray-600)", margin: "var(--spacing-xs) 0" }}>
                      {request.location.city}, {request.location.state}
                    </p>
                    <p style={{ fontSize: "var(--font-size-sm)", color: "var(--color-gray-700)", marginBottom: "var(--spacing-md)" }}>
                      {request.details.substring(0, 100)}...
                    </p>
                    <button
                      className="cp-btn cp-btn-primary"
                      onClick={() => handleInterest(request.id)}
                      style={{ width: "100%", padding: "var(--spacing-sm) var(--spacing-md)", fontSize: "var(--font-size-sm)" }}
                    >
                      Registrar interesse
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Coluna Direita */}
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-xl)" }}>
          {/* Certificações e Cursos */}
          <div className="cp-card">
            <div className="cp-card-header">
              <div>
                <h3 className="cp-card-title">Certificações e cursos</h3>
                <p className="cp-card-subtitle">{courses.length} cursos disponíveis</p>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-md)" }}>
              {courses.length === 0 ? (
                <div className="cp-empty-state">
                  <Book className="cp-empty-state-icon cp-icon-lg" style={{ width: "48px", height: "48px" }} />
                  <h4 className="cp-empty-state-title">Nenhum curso disponível</h4>
                  <p className="cp-empty-state-text">
                    Não há cursos cadastrados no momento.
                  </p>
                </div>
              ) : (
                courses.slice(0, 3).map((course) => (
                  <div
                    key={course.id}
                    style={{
                      padding: "var(--spacing-md)",
                      border: "1px solid var(--color-gray-200)",
                      borderRadius: "var(--radius-lg)",
                      backgroundColor: caregiver?.certifications.includes(course.id) ? "var(--color-gray-50)" : "transparent",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "var(--spacing-xs)" }}>
                      <strong style={{ fontSize: "var(--font-size-base)" }}>{course.name}</strong>
                      {caregiver?.certifications.includes(course.id) && (
                        <span className="feature-tag" style={{ backgroundColor: "var(--color-secondary)", color: "white" }}>
                          Concluído
                        </span>
                      )}
                    </div>
                    <p style={{ fontSize: "var(--font-size-sm)", color: "var(--color-gray-600)", marginBottom: "var(--spacing-sm)" }}>
                      {course.description.substring(0, 80)}...
                    </p>
                    <div style={{ display: "flex", gap: "var(--spacing-sm)", fontSize: "var(--font-size-xs)", color: "var(--color-gray-500)" }}>
                      <span>{course.duration}h</span>
                      <span>•</span>
                      <span>{course.level}</span>
                    </div>
                    <button
                      className="cp-btn cp-btn-ghost"
                      onClick={() => router.push(`/courses/${course.id}`)}
                      style={{ width: "100%", marginTop: "var(--spacing-sm)", padding: "var(--spacing-sm) var(--spacing-md)", fontSize: "var(--font-size-sm)" }}
                    >
                      Ver detalhes
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Indicadores Rápidos */}
          <div className="cp-card">
            <div className="cp-card-header">
              <div>
                <h3 className="cp-card-title">Indicadores rápidos</h3>
              </div>
            </div>
            <div className="cp-stat-row" style={{ flexDirection: "column", gap: "var(--spacing-lg)", borderTop: "none", paddingTop: 0 }}>
              <div className="cp-stat-item">
                <div className="cp-stat-value" style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                  {caregiver?.rating.toFixed(1) || "0.0"}
                  <Star className="cp-icon-sm" style={{ width: "14px", height: "14px", color: "#f59e0b" }} />
                </div>
                <div className="cp-stat-label">Avaliação média</div>
              </div>
              <div className="cp-stat-item">
                <div className="cp-stat-value">127</div>
                <div className="cp-stat-label">Serviços realizados</div>
              </div>
              <div className="cp-stat-item">
                <div className="cp-stat-value">{caregiver?.certifications.length || 0}</div>
                <div className="cp-stat-label">Certificações</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
