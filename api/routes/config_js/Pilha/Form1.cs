using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Pilha
{
    public partial class Form1 : Form
    {
        const int tm = 5;
        decimal[] pilha = new decimal[tm];
        int topo = -1;
        public Form1()
        {
            InitializeComponent();
        }

        private void btnEmpilhar_Click(object sender, EventArgs e)
        {
            Push(numValorEmpilhar.Value);
        }

        private void MostrarPilha()
        {
            lbxPilha.Items.Clear();

            for (int i = tm-1; i >=0; i--)
            {
                lbxPilha.Items.Add(pilha[i]);
            }
        }

        private void button1_Click(object sender, EventArgs e)
        {
            numValorDesmpilhado.Value = Put();
            MostrarPilha();
        }

        private void btnVerificarStatus_Click(object sender, EventArgs e)
        {
            txtTopo.Text     = Topo().ToString();
            chkVazia.Checked = IsEmpty();
            chkCheia.Checked = IsFull();
        }

        private void Push(decimal pValor)
        {
            if (topo == tm - 1)
            {
                MessageBox.Show("Pilha cheia");
                return;
            }

            topo++;
            pilha[topo] = pValor;

            MostrarPilha();
        }
        private decimal Put()
        {
            decimal retorno = -1;

            if (topo >= 0)
            {
                retorno = pilha[topo];
                pilha[topo] = 0;
                topo--;               
            }

            return retorno;
        }

        private int Topo()
        {
            return topo;
        }

        private Boolean IsEmpty()
        {
            return topo < 0;
        }

        private Boolean IsFull()
        {
            return topo == (tm - 1);
        }
    }
}
