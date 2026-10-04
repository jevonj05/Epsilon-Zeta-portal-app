"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import { ArrowLeft, BarChart3 } from "lucide-react";

type Metrics = {
  brothers: number;
  events: number;
  service: string;
  pending: number;
};

export default function ReportsPage() {
  const router = useRouter();
  const [rows,setRows]=useState<any[]>([]);const [metrics, setMetrics] = useState<Metrics>({
    brothers: 0,
    events: 0,
    service: "0.0",
    pending: 0,
  });

  useEffect(() => {
    async function loadReports() {
      const supabase = createClient();
      if (!supabase) return;

      const { data: isAdmin } = await supabase.rpc("is_admin");
      if (!isAdmin) {
        router.replace("/dashboard");
        return;
      }

      const {data:sem}=await supabase.from("semesters").select("id").eq("is_active",true).single();if(!sem)return;
      const [brothersResult, eventsResult, pointsResult, serviceResult] =
        await Promise.all([
          supabase
            .from("profiles")
            .select("id", { count: "exact", head: true })
            .eq("status", "active"),
          supabase.from("events").select("id", { count: "exact", head: true }).eq("semester_id",sem.id),
          supabase
            .from("point_transactions")
            .select("id", { count: "exact", head: true })
            .eq("status", "pending"),
          supabase
            .from("service_records")
            .select("hours")
            .eq("status", "approved"),
        ]);

      const serviceHours = (serviceResult.data ?? []).reduce(
        (total, row) => total + Number(row.hours),
        0
      );

      const{data:reportRows}=await supabase.rpc("chapter_report_rows");setRows(reportRows||[]);setMetrics({
        brothers: brothersResult.count ?? 0,
        events: eventsResult.count ?? 0,
        pending: pointsResult.count ?? 0,
        service: serviceHours.toFixed(1),
      });
    }

    loadReports();
  }, [router]);

  function exportCsv(){const head="Brother,Points,Service Hours,Events Attended";const body=rows.map(x=>`"${String(x.full_name).replaceAll('"','""')}",${x.total_points},${x.service_hours},${x.events_attended}`).join("\n");const blob=new Blob([head+"\n"+body],{type:"text/csv"});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download="epsilon-zeta-semester-report.csv";a.click();URL.revokeObjectURL(url)}

  return (
    <main className="adminPage">
      <button className="backBtn" onClick={() => router.push("/dashboard")}>
        <ArrowLeft /> Dashboard
      </button>

      <p className="eyebrow">E-BOARD</p>
      <h1>Chapter Reports</h1>
      <p className="pageLead">
        Live operational totals from the chapter database.
      </p>

      <div className="reportGrid">
        <div>
          <BarChart3 />
          <b>{metrics.brothers}</b>
          <span>Active Brothers</span>
        </div>
        <div>
          <b>{metrics.events}</b>
          <span>Events</span>
        </div>
        <div>
          <b>{metrics.service}</b>
          <span>Approved Service Hours</span>
        </div>
        <div>
          <b>{metrics.pending}</b>
          <span>Pending Point Requests</span>
        </div>
      </div><div className="tableCard"><div className="tableHead">Semester Member Report <button className="primarySmall" onClick={exportCsv}>Export CSV</button></div>{rows.map(x=><div className="reportRow" key={x.full_name}><b>{x.full_name}</b><span>{x.total_points} pts</span><span>{x.service_hours} service hrs</span><span>{x.events_attended} events</span></div>)}</div>
    </main>
  );
}
