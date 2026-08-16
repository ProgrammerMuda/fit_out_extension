import os
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch

def create_proposal_pdf(output_path):
    doc = SimpleDocTemplate(
        output_path,
        pagesize=A4,
        rightMargin=36,
        leftMargin=36,
        topMargin=36,
        bottomMargin=36
    )
    
    styles = getSampleStyleSheet()
    
    # Custom Brand Colors
    PRIMARY = colors.HexColor('#27B29B')
    PRIMARY_DARK = colors.HexColor('#1F8F7C')
    PRIMARY_LIGHT = colors.HexColor('#E6F8F5')
    DARK = colors.HexColor('#0F172A')
    SLATE = colors.HexColor('#475569')
    LIGHT_BG = colors.HexColor('#F8FAFC')
    BORDER_COLOR = colors.HexColor('#E2E8F0')
    BLUE_ACCENT = colors.HexColor('#0284C7')
    BLUE_LIGHT = colors.HexColor('#F0F9FF')
    ORANGE_ACCENT = colors.HexColor('#EA580C')
    ORANGE_LIGHT = colors.HexColor('#FFF7ED')
    RED_ACCENT = colors.HexColor('#DC2626')
    RED_LIGHT = colors.HexColor('#FFF5F5')
    GREEN_ACCENT = colors.HexColor('#16A34A')
    GREEN_LIGHT = colors.HexColor('#F0FDF4')
    
    # Typography Styles
    style_doc_title = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=17,
        leading=21,
        textColor=PRIMARY,
        spaceAfter=3
    )
    
    style_meta = ParagraphStyle(
        'DocMeta',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8,
        leading=11.5,
        textColor=SLATE
    )

    style_h1 = ParagraphStyle(
        'SectionH1',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11.5,
        leading=15,
        textColor=DARK,
        spaceBefore=10,
        spaceAfter=4
    )

    style_body = ParagraphStyle(
        'BodyDark',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=12.5,
        textColor=DARK,
        spaceAfter=4
    )

    style_body_bold = ParagraphStyle(
        'BodyDarkBold',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=12.5,
        textColor=DARK
    )

    style_body_white = ParagraphStyle(
        'BodyWhite',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=12,
        textColor=colors.white
    )

    style_callout = ParagraphStyle(
        'CalloutText',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8,
        leading=11.5,
        textColor=SLATE
    )

    story = []

    # 1. Header Banner Box
    header_data = [
        [
            Paragraph("PROA PROPERTY MANAGEMENT SYSTEM", ParagraphStyle('SubHeader', fontName='Helvetica-Bold', fontSize=8, textColor=PRIMARY_DARK, spaceAfter=2)),
            Paragraph("SPESIFIKASI ALUR BISNIS & SISTEM", ParagraphStyle('RightHeader', fontName='Helvetica-Bold', fontSize=8, textColor=SLATE, alignment=2))
        ],
        [
            Paragraph("SOP & Arsitektur Alur Kerja Fitout Extension & Final Inspection", style_doc_title),
            ""
        ],
        [
            Paragraph("<b>Target Pembaca:</b> Project Manager (PM), System Architect, UI/UX & Engineering Team<br/><b>Konteks:</b> SOP Pengecekan Lapangan Akhir Periode On Work (Jadwal Awal: 10 Agustus 2026)", style_meta),
            Paragraph("<b>Status:</b> Approved Specification<br/><b>Tanggal:</b> 16 Agustus 2026<br/><b>Versi:</b> v2.1 (Full End-to-End Scenario)", ParagraphStyle('RightMeta', fontName='Helvetica', fontSize=8, leading=11, textColor=SLATE, alignment=2))
        ]
    ]

    header_table = Table(header_data, colWidths=[340, 180])
    header_table.setStyle(TableStyle([
        ('SPAN', (0, 1), (1, 1)),
        ('BACKGROUND', (0, 0), (-1, -1), LIGHT_BG),
        ('BOX', (0, 0), (-1, -1), 1, BORDER_COLOR),
        ('LINEBEFORE', (0, 0), (0, -1), 4, PRIMARY),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ('LEFTPADDING', (0, 0), (-1, -1), 10),
        ('RIGHTPADDING', (0, 0), (-1, -1), 10),
    ]))
    story.append(header_table)
    story.append(Spacer(1, 8))

    # 2. Ringkasan Alur Skenario Utama (Diagram Naratif)
    story.append(Paragraph("1. Rangkaian Skenario Utama (End-to-End Workflow)", style_h1))
    story.append(Paragraph(
        "Alur kerja penanganan perpanjangan jadwal fitout dirancang dengan skenario lugas berbasis peran lapangan dan manajemen:",
        style_body
    ))

    scenario_cards_data = [
        [
            Paragraph("<b>LANGKAH 1: PENGAJUAN ENGINEERING (MOBILE)</b><br/>Petugas Engineering di lapangan menemukan renovasi belum rampung. Mengisi form di aplikasi mobile: <b>Estimasi Tambahan Hari (+3 Hari)</b>, <b>Upload Foto Temuan</b>, dan <b>Catatan Teknis (Notes)</b> ➔ Dikirim ke TR.", style_body),
            Paragraph("<b>LANGKAH 2: KEPUTUSAN TENANT RELATION (TR)</b><br/>TR mereview pengajuan via dashboard. TR memiliki 2 keputusan mutlak:<br/>• <b>APPROVE</b> ➔ Menetapkan skema <b>Gratis (Free)</b> atau <b>Berbayar (Chargeable)</b>.<br/>• <b>REJECT</b> ➔ Menolak dengan catatan resmi alasan penolakan.", style_body)
        ],
        [
            Paragraph("<b>HASIL JIKA DI-APPROVE (GRATIS / BAYAR)</b><br/>• <b>Gratis:</b> Jadwal otomatis diperpanjang ke tgl 13 Aug tanpa biaya.<br/>• <b>Berbayar:</b> Terbit invoice <i>Extension Bill</i>, status jadi <i>Waiting Payment</i> ➔ <i>On Work</i> setelah lunas.", style_body),
            Paragraph("<b>HASIL JIKA DI-REJECT & AUTO-FINAL INSPECTION</b><br/>• Tiket tetap <b>On Work</b> hanya sampai batas jam kerja tgl 10 Aug.<br/>• <b>Aturan Otomatis:</b> Jika tidak ada kesepakatan baru antara TR & Tenant, maka <b>otomatis pekerjaan dianggap selesai & tiket masuk ke FINAL INSPECTION</b> untuk dicek.", style_body)
        ]
    ]
    scenario_cards_table = Table(scenario_cards_data, colWidths=[255, 255])
    scenario_cards_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (0, 0), ORANGE_LIGHT),
        ('BACKGROUND', (1, 0), (1, 0), BLUE_LIGHT),
        ('BACKGROUND', (0, 1), (0, 1), GREEN_LIGHT),
        ('BACKGROUND', (1, 1), (1, 1), RED_LIGHT),
        ('BOX', (0, 0), (0, 0), 1, colors.HexColor('#FED7AA')),
        ('BOX', (1, 0), (1, 0), 1, colors.HexColor('#BAE6FD')),
        ('BOX', (0, 1), (0, 1), 1, colors.HexColor('#BBF7D0')),
        ('BOX', (1, 1), (1, 1), 1, colors.HexColor('#FECACA')),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
        ('RIGHTPADDING', (0, 0), (-1, -1), 8),
    ]))
    story.append(scenario_cards_table)
    story.append(Spacer(1, 8))

    # 3. Matriks Alur Keputusan Detail (Step-by-Step Flow Breakdown)
    story.append(Paragraph("2. Detail Matriks Keputusan & Perilaku Sistem", style_h1))

    flow_table_data = [
        [
            Paragraph("Tahapan Alur", style_body_white),
            Paragraph("Aktor & Aksi Sistem", style_body_white),
            Paragraph("Logika Status Tiket & Finansial", style_body_white)
        ],
        [
            Paragraph("<b>1. Pengajuan Awal</b><br/>(Request Submission)", style_body_bold),
            Paragraph("<b>Engineering Lead</b> (Mobile App):<br/>• Upload 1-3 foto dokumentasi pipa/struktur.<br/>• Tulis catatan kendala teknis (Notes).<br/>• Submit usulan durasi (+3 Hari).", style_body),
            Paragraph("• Status: <b>On Work</b><br/>• Badge: <b>Waiting for Approval</b><br/>• Muncul notifikasi review di dashboard TR.", style_body)
        ],
        [
            Paragraph("<b>2. Keputusan TR:<br/>APPROVE (Gratis)</b>", style_body_bold),
            Paragraph("<b>Tenant Relation</b> (Web / Mobile):<br/>• Pilih opsi <b>Free of Charge</b>.<br/>• Masukkan alasan kebijakan (cth: toleransi semen).<br/>• Klik <b>Submit</b>.", style_body),
            Paragraph("• Biaya: <b>Rp 0,00</b><br/>• Tanggal Berakhir: <b>13 Aug 2026</b><br/>• Status: Tetap <b>On Work</b> tanpa tagihan baru.", style_body)
        ],
        [
            Paragraph("<b>3. Keputusan TR:<br/>APPROVE (Berbayar)</b>", style_body_bold),
            Paragraph("<b>Tenant Relation</b> (Web / Mobile):<br/>• Pilih opsi <b>Chargeable</b>.<br/>• Masukkan nominal biaya supervisi (Rp).<br/>• Klik <b>Submit</b>.", style_body),
            Paragraph("• Biaya: Terbit <b>Fitout Extension Bill</b>.<br/>• Status: <b>Waiting Payment</b>.<br/>• Setelah tenant bayar ➔ berubah jadi <b>On Work</b> (tgl 13 Aug).", style_body)
        ],
        [
            Paragraph("<b>4. Keputusan TR:<br/>REJECT (Ditolak)</b>", style_body_bold),
            Paragraph("<b>Tenant Relation</b> (Web / Mobile):<br/>• Klik tombol <b>Reject Request</b>.<br/>• Masukkan alasan penolakan resmi di modal.<br/>• Klik <b>Confirm Rejection</b>.", style_body),
            Paragraph("• Status: Tetap <b>On Work</b> s/d 10 Aug sore.<br/>• Akses pekerja diblokir setelah jam izin habis.<br/>• Riwayat penolakan tercatat di timeline.", style_body)
        ],
        [
            Paragraph("<b>5. Otomatisasi Akhir:<br/>AUTO-FINAL INSPECTION</b>", style_body_bold),
            Paragraph("<b>Sistem Otomatis (System Automation)</b>:<br/>Jika tiket di-reject dan <b>tidak ada kesepakatan baru</b> antara TR dan Tenant sampai jam izin kerja berakhir.", style_body),
            Paragraph("• Pekerjaan unit <b>otomatis dianggap selesai</b>.<br/>• <b>Tiket otomatis berpindah ke Step 6: FINAL INSPECTION</b> agar dapat segera dicek tim gedung.", style_body)
        ]
    ]

    flow_table = Table(flow_table_data, colWidths=[125, 205, 190])
    flow_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), DARK),
        ('BACKGROUND', (0, 1), (-1, 1), colors.white),
        ('BACKGROUND', (0, 2), (-1, 2), LIGHT_BG),
        ('BACKGROUND', (0, 3), (-1, 3), colors.white),
        ('BACKGROUND', (0, 4), (-1, 4), RED_LIGHT),
        ('BACKGROUND', (0, 5), (-1, 5), PRIMARY_LIGHT),
        ('GRID', (0, 0), (-1, -1), 0.5, BORDER_COLOR),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ('LEFTPADDING', (0, 0), (-1, -1), 7),
        ('RIGHTPADDING', (0, 0), (-1, -1), 7),
    ]))
    story.append(flow_table)
    story.append(Spacer(1, 8))

    # 4. Prinsip Pemisahan Wewenang & Operasional Apartemen
    story.append(Paragraph("3. Landasan Aturan Operasional Gedung Apartemen", style_h1))

    rules_box_data = [
        [
            Paragraph(
                "<b>1. Pembatasan Akses Pekerja (Security Gate Control):</b><br/>"
                "Di apartemen, ID Card izin kerja kontraktor terikat ketat dengan tanggal permit. Ketika permohonan extension di-reject, pekerja hanya memiliki izin berada di unit hingga batas jam kerja sore hari ini (10 Aug) untuk merapikan alat (*site clearance*). Besoknya, akses otomatis diblokir Security.<br/><br/>"
                "<b>2. Menghindari Blocker / Status Menggantung (No Deadlock):</b><br/>"
                "Dengan adanya aturan <i>Auto-Final Inspection</i> saat tidak tercapai kesepakatan baru pasca-rejection, sistem memastikan tiket tidak menggantung (*stuck in limbo*). Tim Engineering dan TR dapat langsung melakukan inspeksi kelulusan fisik, mencatat temuan cacat/defects (bila ada), dan memproses penutupan BAST serta pengembalian deposit tenant secara tertib.",
                style_body
            )
        ]
    ]
    rules_table = Table(rules_box_data, colWidths=[520])
    rules_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), LIGHT_BG),
        ('BOX', (0, 0), (-1, -1), 1, BORDER_COLOR),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ('LEFTPADDING', (0, 0), (-1, -1), 10),
        ('RIGHTPADDING', (0, 0), (-1, -1), 10),
    ]))
    story.append(rules_table)
    story.append(Spacer(1, 8))

    # 5. Sign-off Summary Box untuk PM
    sign_box_data = [
        [
            Paragraph(
                "<b>Rangkuman untuk Project Manager:</b><br/>"
                "Alur di atas mencakup seluruh siklus operasional: mulai dari pengajuan foto teknis via mobile, fleksibilitas keputusan TR (Gratis / Bayar / Tolak), hingga proteksi otomatis perpindahan tiket ke <b>Final Inspection</b> jika extension ditolak tanpa kesepakatan baru. Seluruh komponen UI & logika bisnis telah terintegrasi penuh pada aplikasi web & prototype.",
                style_callout
            )
        ]
    ]
    sign_table = Table(sign_box_data, colWidths=[520])
    sign_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), PRIMARY_LIGHT),
        ('BOX', (0, 0), (-1, -1), 1, PRIMARY),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ('LEFTPADDING', (0, 0), (-1, -1), 10),
        ('RIGHTPADDING', (0, 0), (-1, -1), 10),
    ]))
    story.append(sign_table)

    doc.build(story)
    print(f"PDF successfully generated at: {output_path}")

if __name__ == '__main__':
    project_root = "/Users/rmm/Documents/Vibe Coding Proapps/FITOUT WEB"
    pdf_filename = "Fitout_Workflow_Completion_&_Extension_Proposal.pdf"
    
    # Save in project root
    output_root_path = os.path.join(project_root, pdf_filename)
    create_proposal_pdf(output_root_path)

    # Also copy to public/ so it can be viewed / downloaded via browser
    public_dir = os.path.join(project_root, "public")
    os.makedirs(public_dir, exist_ok=True)
    output_public_path = os.path.join(public_dir, pdf_filename)
    create_proposal_pdf(output_public_path)
